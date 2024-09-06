import { Request, Response, NextFunction } from "express";

import CartModel from "../models/cart.model";
import { catchAsync } from "../utils/utils";
import { IBaseRequest } from "../Interfaces/utils/utils.interfaces";
import AppError from "../utils/appError";
import ProductModel from "../models/product.model";
import { ICartItem } from "../Interfaces/cart.interface";

export const getCart = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const cart = await CartModel.findOne({ user: req.user._id });
    res.status(200).json({
      status: "success",
      data: cart,
    });
  });

export const addToCart = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;
    let cart = await CartModel.findOne({ user: req.user._id });
    const product = await ProductModel.findById(productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    if (!cart) {
      cart = new CartModel({ user: req.user._id, items: [] });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      } as ICartItem);
    }

    // Calculate total amount
    cart.totalAmount = 0;
    for (const item of cart.items) {
      const itemProduct = await ProductModel.findById(item.product);
      if (itemProduct) {
        cart.totalAmount += itemProduct.price * item.quantity;
      }
    }

    await cart.save();

    return res.status(200).json({
      status: "success",
      data: cart,
    });
  });

export const removeFromCart = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    const cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }
  });

export const updateCart = () =>
  catchAsync(async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { productId, quantity } = req.body;
    const cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }
  });
