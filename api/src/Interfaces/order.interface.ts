import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IOrderItem {
  product: IProduct["_id"];
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  user: IUser["_id"];
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
