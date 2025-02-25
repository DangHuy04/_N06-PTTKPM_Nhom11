import express from "express";
import Product from "../model/Products.js";

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        // Vì URL của bạn dùng ?query=iph nên lấy tham số từ req.query.query
        const keyword = req.query.query || "";

        // Nếu không có từ khóa, render trang với danh sách rỗng
        if (!keyword) {
            return res.render("search", {
                layout: "home",  // Sử dụng layout tại resources/views/layouts/home.handlebars
                title: "Kết quả tìm kiếm",
                keyword: "",
                products: []
            });
        }

        // Tìm các sản phẩm có name, description hoặc tags chứa từ khóa (không phân biệt hoa thường)
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $in: [new RegExp(keyword, "i")] } }
            ]
        }).select("productId name price image description");

        res.render("search", {
            layout: "home",  // Sử dụng layout "home.handlebars"
            title: `Kết quả tìm kiếm cho "${keyword}"`,
            keyword,
            products: results
        });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        res.status(500).send("Có lỗi xảy ra, vui lòng thử lại.");
    }
});

export default route;
