import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controller/cart.controller";

const router = Router();

router.get("/", getCart());
router.post("/add", addToCart());
router.delete("/remove", removeFromCart());
router.patch("/update", updateCart());

export default router;
