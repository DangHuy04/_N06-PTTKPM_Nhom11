// controllers/searchController.js
import Product from "../model/Products.js";

const searchAPI = async(req, res) => {
    try {
        const { query } = req.query;
        
        if(!query) {
            return res.status(400).json({ message: "Query is required"});
        }

        // Thêm giới hạn kết quả và sắp xếp
        const results = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $in: [new RegExp(query, 'i')] } }
            ]
        })
        .select('name price image description') // Chỉ lấy các trường cần thiết
        .limit(5) // Giới hạn 5 kết quả
        .sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo mới nhất

        // Format kết quả trước khi trả về
        const formattedResults = results.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description?.substring(0, 100) // Giới hạn độ dài mô tả
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            error: "Có lỗi xảy ra khi tìm kiếm",
            details: error.message 
        });
    }
};

export default searchAPI;
