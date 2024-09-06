import express from "express";
import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} from "../controller/order.controller";

const router = express.Router();

router.post("/", createOrder);
router.get("/user", getUserOrders);
router.get("/:orderId", getOrderById);
router.patch("/:orderId/status", updateOrderStatus);

export default router;
