import mongoose, { Schema, Model } from "mongoose";
import {
  IChatroom,
  IChatroomModel,
  IMessage,
} from "../Interfaces/chatRoom.interface";

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatroomSchema = new Schema<IChatroom>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    messages: [messageSchema],
  },
  { timestamps: true }
);

chatroomSchema.statics.findOrCreateChatroom = async function (
  productId: string,
  buyerId: string,
  sellerId: string
): Promise<IChatroom> {
  let chatroom = await this.findOne({
    product: productId,
    buyer: buyerId,
    seller: sellerId,
  });

  if (!chatroom) {
    chatroom = await this.create({
      product: productId,
      buyer: buyerId,
      seller: sellerId,
      messages: [],
    });
  }

  return chatroom;
};

chatroomSchema.statics.addMessage = async function (
  chatroomId: string,
  senderId: string,
  content: string
) {
  const chatroom = await this.findById(chatroomId);
  if (!chatroom) throw new Error("Chatroom not found");

  const message = { senderId, content, timestamp: new Date() };
  chatroom.messages.push(message);
  await chatroom.save();
  return message;
};

const ChatroomModel: IChatroomModel = mongoose.model<IChatroom, IChatroomModel>(
  "Chatroom",
  chatroomSchema
);

export default ChatroomModel;
