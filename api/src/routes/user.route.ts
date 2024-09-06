import { Router } from "express";
import { getOne, deleteOne, getAll } from "../controller/utils/handlerFactory";
import Users from "../models/user.model";
import {
  getCurrentUser,
  getSellerStats,
  updateUser,
} from "../controller/user.controller";
import { isOwner } from "../middleware/util/auth.middleware";

const router = Router();

router.route("/me").get(getCurrentUser());

router
  .route("/:id")
  .get(getOne(Users))
  .patch(isOwner, updateUser)
  .delete(isOwner, deleteOne(Users));

router.get("/", getAll(Users));

router.get("/seller/stats", getSellerStats());

export default router;
