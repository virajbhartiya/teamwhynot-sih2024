import express from "express";
import {
  addMessage,
  deleteChatroom,
  getChatroom,
  getChatrooms,
  getMessages,
} from "../controller/chatroom.controller";

const router = express.Router();

router.route("/").get(getChatrooms);

router.route("/:chatroomId").get(getChatroom).delete(deleteChatroom);

router.route("/:chatroomId/messages").post(addMessage).get(getMessages);

export default router;
