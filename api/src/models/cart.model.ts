import mongoose, { Document, Schema } from "mongoose";
import { ICart, ICartItem } from "../Interfaces/cart.interface";

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [cartItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const CartModel = mongoose.model<ICart>("Cart", cartSchema);

export default CartModel;
