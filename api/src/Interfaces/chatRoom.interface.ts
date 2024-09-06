import { Document, Model } from "mongoose";
import { IUser } from "./user.interface";
import { IProduct } from "./product.interface";

export interface IMessage {
  sender: IUser["_id"];
  content: string;
  timestamp: Date;
}

export interface IChatroom extends Document {
  product: IProduct["_id"];
  buyer: IUser["_id"];
  seller: IUser["_id"];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IChatroomModel extends Model<IChatroom> {
  [x: string]: any;
  findOrCreateChatroom(
    productId: string,
    buyerId: string,
    sellerId: string
  ): Promise<IChatroom>;
}
