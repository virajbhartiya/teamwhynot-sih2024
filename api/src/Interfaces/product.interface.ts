import { ObjectId } from "mongoose";

export interface IProduct extends Document {
  _id: ObjectId;
  name: string;
  price: number;
  seller: ObjectId;
  photos: string[];
  quantity: number;
  ratings: number[];
  category: string;
  description: string;
  expiryDate: Date;
  dateProduced: Date;
}
