import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// Route hiển thị chi tiết sản phẩm
router.get("/:productID", productController.show);

export default router;
