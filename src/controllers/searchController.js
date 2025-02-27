// controllers/searchController.js
import Product from "../model/Products.js";

// API tìm kiếm sản phẩm
const searchAPI = async (req, res) => {
    try {
        const keyword = req.query.query?.trim(); // Loại bỏ khoảng trắng thừa

        if (!keyword) {
            return res.render("search", {
                layout: "home",
                title: "Kết quả tìm kiếm",
                keyword: "",
                products: []
            });
        }

        // Thêm giới hạn kết quả và sắp xếp
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $elemMatch: { $regex: keyword, $options: "i" } } }
            ]
        }).select("productId name price image description");

        res.render("search", {
            layout: "home",
            title: `Kết quả tìm kiếm cho "${keyword}"`,
            keyword,
            products: results
        });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        res.status(500).send(`Có lỗi xảy ra: ${error.message}`);
    }
};

// API gợi ý tìm kiếm
const suggestSearch = async (req, res) => {
    try {
        const query = req.query.q?.trim();
        if (!query) {
            return res.status(400).json({ message: "Thiếu tham số truy vấn (query)" });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $elemMatch: { $regex: query, $options: "i" } } }
            ]
        })
        .select("productId name price image")
        .limit(5);
        res.json(products);
    } catch (error) {
        console.error("Lỗi gợi ý tìm kiếm:", error);
        res.status(500).json({ error: `Có lỗi xảy ra: ${error.message}` });
    }
};

export { searchAPI, suggestSearch };
