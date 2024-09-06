import { Document, ObjectId } from "mongoose";

export interface ICartItem extends Document {
  _id: string;
  product: ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  _id: string;
  user: ObjectId;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
