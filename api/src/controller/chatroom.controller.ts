import { Request, Response, NextFunction } from "express";

import { IBaseRequest } from "../Interfaces/utils/utils.interfaces";
import { catchAsync } from "../utils/utils";
import ChatroomModel from "../models/chatroom.model";

export const createChatroom = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { productId, buyerId, sellerId } = req.body;
    const chatroom = await ChatroomModel.findOrCreateChatroom(
      productId,
      buyerId,
      sellerId
    );

    res.status(201).json({
      status: "success",
      data: chatroom,
    });
  }
);

export const getChatroom = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { chatroomId } = req.params;
    const chatroom = await ChatroomModel.findById(chatroomId);
    if (!chatroom) {
      return res.status(404).json({
        status: "fail",
        message: "Chatroom not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: chatroom,
    });
  }
);

export const getChatrooms = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const chatrooms = await ChatroomModel.find();
    res.status(200).json({
      status: "success",
      results: chatrooms.length,
      data: chatrooms,
    });
  }
);

export const deleteChatroom = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { chatroomId } = req.params;
    const chatroom = await ChatroomModel.findByIdAndDelete(chatroomId);
    if (!chatroom) {
      return res.status(404).json({
        status: "fail",
        message: "Chatroom not found",
      });
    }
    res.status(204).send();
  }
);

export const addMessage = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { chatroomId } = req.params;
    const { senderId, content } = req.body;

    if (!senderId || !content) {
      return res.status(400).json({
        status: "fail",
        message: "senderId and content are required",
      });
    }

    const message = await ChatroomModel.addMessage(
      chatroomId,
      senderId,
      content
    );
    res.status(201).json({
      status: "success",
      data: message,
    });
  }
);

export const getMessages = catchAsync(
  async (req: IBaseRequest, res: Response, next: NextFunction) => {
    const { chatroomId } = req.params;
    const messages = await ChatroomModel.getMessages(chatroomId);
    res.status(200).json({
      status: "success",
      data: messages,
    });
  }
);
