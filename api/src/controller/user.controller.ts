import AppError from "../utils/appError";
import { Response, NextFunction } from "express";
import { IBaseRequest } from "../Interfaces/utils/utils.interfaces";
import { catchAsync } from "../utils/utils";
import UserModel from "../models/user.model";
import OrderModel from "../models/order.model";

export const updateUser = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const doc = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    return res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getCurrentUser = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    console.log(req.user);
    const doc = await UserModel.findById(req.user._id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    console.log(doc);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getSellerStats = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    console.log(req.user);
    const sellerId = req.user._id;
    if (req.user.role !== "seller") {
      return next(new AppError("You are not authorized to access this", 401));
    }

    const stats = await OrderModel.aggregate([
      { $match: { seller: sellerId } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
          totalProducts: { $sum: { $size: "$products" } },
          totalDeliveries: { $sum: { $size: "$deliveries" } },
        },
      },
    ]);

    if (stats.length === 0) {
      return res.status(200).json({
        status: "success",
        data: {
          totalRevenue: 0,
          totalOrders: 0,
          totalProducts: 0,
          totalDeliveries: 0,
        },
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        totalRevenue: stats[0].totalRevenue,
        totalOrders: stats[0].totalOrders,
        totalProducts: stats[0].totalProducts,
        totalDeliveries: stats[0].totalDeliveries,
      },
    });
  });
