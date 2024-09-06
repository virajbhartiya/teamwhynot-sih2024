import { Request, Response, NextFunction } from "express";
import OrderModel from "../models/order.model";
import ProductModel from "../models/product.model";
import { IBaseRequest } from "../Interfaces/utils/utils.interfaces";
import { catchAsync } from "../utils/utils";

export const createOrder = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { items, shippingAddress } = req.body;
    const userId = req.user._id;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await ProductModel.findById(item.product);
      if (!product) {
        return res.status(404).json({
          status: "fail",
          message: `Product with id ${item.product} not found`,
        });
      }

      orderItems.push({
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await OrderModel.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });

    res.status(201).json({
      status: "success",
      data: order,
    });
  }
);

export const getOrderById = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await OrderModel.findOne({
      _id: orderId,
      user: userId,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  }
);

export const getUserOrders = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const userId = req.user._id;

    const orders = await OrderModel.find({ user: userId }).populate(
      "items.product"
    );

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: orders,
    });
  }
);

export const updateOrderStatus = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate("items.product");

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  }
);
