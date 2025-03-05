import express from "express";
import {index,addToCart} from "../controllers/cartController.js"; 
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lấy giỏ hàng của user
router.get("/", authMiddleware, index);

// Thêm sản phẩm vào giỏ hàng
router.post("/add", authMiddleware, addToCart);

export default router;
