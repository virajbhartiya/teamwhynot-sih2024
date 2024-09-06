import { Response, NextFunction } from "express";
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";
import { data } from "../data/commodities";
import { catchAsync } from "../utils/utils";
import { IBaseRequest } from "../Interfaces/utils/utils.interfaces";
import OrderModel from "../models/order.model";
import { regulatedCropPrice } from "../routes/pricing.route";

export const createProduct = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const {
      name,
      price,
      photos,
      quantity,
      category,
      description,
      expiryDate,
      dateProduced,
    } = req.body;
    const sellerId = req.user._id;

    const commodityPrices = getComodityPrices(name);

    if (commodityPrices.status === "fail") {
      return res.status(404).json({
        status: "fail",
        message: "Commodity not found",
      });
    }

    const regulatedPrice = regulatedCropPrice({
      season: "summer",
      demand: 1000,
      supply: 600,
      minResaleValue: commodityPrices.data.minPrice,
      maxResaleValue: commodityPrices.data.maxPrice,
      modalResaleValue: (commodityPrices.data.modalPrice + price * 100) / 2,
    });

    const product = await (
      await ProductModel.create({
        name,
        price: (regulatedPrice / 100.0).toFixed(2),
        seller: sellerId,
        photos,
        quantity,
        category,
        description,
        expiryDate,
        dateProduced,
      })
    ).populate("seller");

    await UserModel.findByIdAndUpdate(sellerId, {
      $push: { products: product._id },
    });

    res.status(201).json({
      status: "success",
      data: product,
    });
  }
);

export const getProductsBySeller = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const sellerId = req.user._id;

    const products = await ProductModel.find({ seller: sellerId });
    console.log(products);
    res.status(200).json({
      status: "success",
      data: products,
    });
  }
);

export const getAllProducts = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const products = await ProductModel.find()
      .populate("seller")
      .sort("-expiryDate");

    res.status(200).json({
      status: "success",
      data: products,
    });
  }
);

export const editProduct = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { name, photos, quantity, expiryDate, dateProduced, price } =
      req.body;
    const sellerId = req.user._id;

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId, seller: sellerId },
      { name, photos, quantity, expiryDate, dateProduced }, // Added quantity to the update
      { new: true, runValidators: true }
    ).populate("seller");

    if (!updatedProduct) {
      return res.status(404).json({
        status: "fail",
        message:
          "Product not found or you are not authorized to edit this product",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  }
);

export const deleteProduct = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const sellerId = req.user._id;

    const product = await ProductModel.findOneAndDelete({
      _id: productId,
      seller: sellerId,
    });

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message:
          "Product not found or you are not authorized to delete this product",
      });
    }

    return res.status(200).json({
      status: "success",
      data: product,
    });
  }
);

// export const getAveragePrice = catchAsync(
//   async (req: IBaseRequest, res: Response, next: NextFunction) => {
//     const name = req.params.name;
//     const products = await ProductModel.find({ name });
//     if (products.length === 0) {
//       return res.status(404).json({
//         status: "fail",
//         message: "Product not found",
//       });
//     }

//     const totalPrice = products.reduce(
//       (sum, product) => sum + product.price,
//       0
//     );
//     const averagePrice = totalPrice / products.length;

//     res.status(200).json({
//       status: "success",
//       data: {
//         averagePrice,
//         productCount: products.length,
//       },
//     });
//   }
// );

export const getTopSellingProducts = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const topSellingProducts = await OrderModel.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.product", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.status(200).json({
      status: "success",
      data: topSellingProducts,
    });
  }
);

export const getProductbyId = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const product = await ProductModel.findOne({ _id: productId });
    res.status(200).json({
      status: "success",
      data: product,
    });
  }
);

export const addProductRating = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const rating = req.body.rating;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    product.ratings.push(rating);
    await product.save();
    res.status(200).json({
      status: "success",
      data: product.ratings,
    });
  }
);

export const getComodityPrices = (name: any) => {
  const commodity = name;
  const commodities =
    data.Envelope.Body.showResponse.showResult.diffgram.NewDataSet.Table.filter(
      (item) => item.Commodity === commodity
    );

  if (commodities.length === 0) {
    return {
      status: "fail",
      message: "Commodity not found",
    };
  }

  const prices = commodities.map((item) => parseFloat(item.Modal_x0020_Price));
  const averagePrice =
    prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const modalPrice = prices
    .sort(
      (a, b) =>
        prices.filter((v) => v === a).length -
        prices.filter((v) => v === b).length
    )
    .pop();

  return {
    status: "success",
    data: {
      averagePrice,
      minPrice,
      maxPrice,
      modalPrice,
    },
  };
};

export const getProductAverageRating = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    if (product.ratings.length === 0) {
      return res.status(200).json({
        status: "success",
        data: 0,
      });
    }
    const averageRating =
      product.ratings.reduce((sum, rating) => sum + rating, 0) /
      product.ratings.length;
    res.status(200).json({
      status: "success",
      data: averageRating,
    });
  }
);
