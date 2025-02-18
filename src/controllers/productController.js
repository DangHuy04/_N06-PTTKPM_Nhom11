import Product from "../model/Products.js";
import { multipleMongooseToObject } from "../util/mongoose.js";

class ProductController {
    async show(req, res) {
        try {
            // Lấy thông tin sản phẩm từ MongoDB
            const product = await Product.findOne({ productId: req.params.productID });

            if (!product) {
                return res.status(404).send("Sản phẩm không tồn tại");
            }

            res.render("productDetail", {
                name: product.name,
                price: product.price.toLocaleString() + "đ",
                image: product.image,
                description: product.description,
                category: product.category,
                stock: product.stock,
                storage: product.specs.storage,
                color: product.specs.color,
                camera: product.specs.camera,
                battery: product.specs.battery
            });
        } catch (error) {
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }
}

export default new ProductController();
