import express from "express";
import {index,addToCart} from "../controllers/cartController.js"; 

const router = express.Router();

// Lấy giỏ hàng của user
router.get("/", index);

// Thêm sản phẩm vào giỏ hàng
router.post("/add", addToCart);

export default router;
