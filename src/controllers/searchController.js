// controllers/searchController.js
import Product from "../model/Products.js";

const searchAPI = async (req, res) => {
    try {
        const keyword = req.query.query?.trim();
        const priceRange = req.query.priceRange;
        const sort = req.query.sort;

        if (!keyword) {
            return res.render("search", {
                layout: "home",
                title: "Kết quả tìm kiếm",
                keyword: "",
                products: [],
                priceRange,
                sort
            });
        }

        // Xây dựng query
        let searchQuery = {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $elemMatch: { $regex: keyword, $options: "i" } } }
            ]
        };

        // Thêm điều kiện về giá nếu có
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            searchQuery.price = {
                $gte: minPrice,
                $lte: maxPrice
            };
        }

        // Thêm sắp xếp
        let sortOption = {};
        if (sort === 'asc') {
            sortOption = { price: 1 };
        } else if (sort === 'desc') {
            sortOption = { price: -1 };
        }

        const results = await Product.find(searchQuery)
            .sort(sortOption)
            .select("productId name price oldPrice image description discount installment")
            .lean()
            .exec();

        // Xử lý dữ liệu trước khi render
        const processedResults = results.map(product => {
            return {
                ...product,
                price: new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(product.price),
                oldPrice: product.oldPrice ? new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                }).format(product.oldPrice) : null,
                discount: product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) + '%' : null
            };
        });

        res.render("search", {
            layout: "home",
            title: `Kết quả tìm kiếm cho "${keyword}"`,
            keyword,
            products: processedResults,
            priceRange,
            sort
        });
    } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
        res.status(500).send(`Có lỗi xảy ra: ${error.message}`);
    }
};



const suggestSearch = async (req, res) => {
    try {
        const query = req.query.q?.trim();
        const minPrice = Number(req.query.minPrice) || 0;
        const maxPrice = Number(req.query.maxPrice) || Infinity;

        if (!query) {
            return res.status(400).json({ message: "Thiếu tham số truy vấn (query)" });
        }

        const searchQuery = {
            $and: [
                {
                    $or: [
                        { name: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                        { tags: { $elemMatch: { $regex: query, $options: "i" } } }
                    ]
                },
                {
                    price: {
                        $gte: minPrice,
                        $lte: maxPrice
                    }
                }
            ]
        };

        const products = await Product.find(searchQuery)
            .select("productId name price image")
            .limit(5);
        res.json(products);
    } catch (error) {
        console.error("Lỗi gợi ý tìm kiếm:", error);
        res.status(500).json({ error: `Có lỗi xảy ra: ${error.message}` });
    }
};

export { searchAPI, suggestSearch };
