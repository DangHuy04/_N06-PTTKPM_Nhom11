import Product from "../model/Products.js";
import { multipleMongooseToObject } from "../util/mongoose.js";

class ProductController {
    async show(req, res) {
        try {
            // Lấy thông tin sản phẩm chính từ MongoDB
            const product = await Product.findOne({ productId: req.params.productID });

            if (!product) {
                return res.status(404).send("Sản phẩm không tồn tại");
            }

            // Lấy các sản phẩm tương tự (cùng category, khác productId)
            const relatedProducts = await Product.find({
                category: product.category,
                productId: { $ne: req.params.productID }
            }).limit(4); // Giới hạn 4 sản phẩm tương tự

            // Format giá cho sản phẩm tương tự
            const formattedRelatedProducts = relatedProducts.map(prod => ({
                productId: prod.productId,
                name: prod.name,
                price: prod.price.toLocaleString() + "đ",
                image: prod.image,
                discount: prod.discount,
                installment: prod.installment,
                oldPrice: prod.oldPrice ? prod.oldPrice.toLocaleString() + "đ" : null
            }));

            // Render view với đầy đủ thông tin
            res.render("productDetail", {
                // Thông tin sản phẩm chính
                name: product.name,
                price: product.price.toLocaleString() + "đ",
                image: product.image,
                description: product.description,
                category: product.category,
                stock: product.stock,
                
                // Thông số kỹ thuật
                specs: {
                    storage: product.specs.storage,
                    color: product.specs.color,
                    camera: product.specs.camera,
                    battery: product.specs.battery
                },

                // Sản phẩm tương tự
                title: "Sản phẩm tương tự",
                products: formattedRelatedProducts
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }
}

export default new ProductController();
