import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  emailId: string;
  role: "buyer" | "seller" | "admin" | "delivery";
  products: ObjectId[];
  verified?: boolean;
  createdAt: string;
  location: string;
  phone: string;
  hashed_password: string;
  salt: string;
}
