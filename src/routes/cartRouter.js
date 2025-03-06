import express from "express";
import {index,addToCart,updateCart} from "../controllers/cartController.js"; 
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Lấy giỏ hàng của user
router.get("/", authMiddleware, index);

// Thêm sản phẩm vào giỏ hàng
router.post("/add", authMiddleware, addToCart);

// Cập nhật thay đổi trong giỏ hàng
router.post("/update-cart", authMiddleware, updateCart);
    

export default router;
