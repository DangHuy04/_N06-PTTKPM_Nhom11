import express from "express";
import Product from "../model/Products.js";

const router = express.Router();

// API gợi ý tìm kiếm
router.get('/search-suggestions', async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $in: [new RegExp(query, 'i')] } }
            ]
        })
        .select('productId name price image') // Đảm bảo trả về productId
        .limit(5);

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
