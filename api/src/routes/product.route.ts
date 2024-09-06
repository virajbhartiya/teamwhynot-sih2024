import { Router } from "express";
import {
  addProductRating,
  createProduct,
  editProduct,
  getAllProducts,
  // getAveragePrice,
  getProductAverageRating,
  getProductbyId,
  getProductsBySeller,
  getTopSellingProducts,
} from "../controller/product.controller";
import { restrictTo } from "../middleware/util/auth.middleware";

const router = Router();

router.post("/", restrictTo("seller"), createProduct);
router.get("/", getAllProducts);
router.get("/seller", getProductsBySeller);
router.get("/top-selling", getTopSellingProducts);
// router.get("/average-price/:name", getAveragePrice);
router.get("/:productId", getProductbyId);
router.get("/:productId/average-rating", getProductAverageRating);
router.patch("/:productId", restrictTo("seller"), editProduct);
router.post("/:productId/ratings", restrictTo("user"), addProductRating);

export default router;
