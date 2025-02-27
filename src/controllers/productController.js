import Product from "../model/Products.js";
import { multipleMongooseToObject } from "../util/mongoose.js";

class ProductController {
    async show(req, res) {
        try {
            const product = await Product.findOne({ productId: req.params.productID });

            if (!product) {
                return res.status(404).send("Sản phẩm không tồn tại");
            }

            // Xác định loại specs dựa trên category
            let specsDisplay;
            if (product.category === 'iphone') {
                specsDisplay = {
                    type: 'iphone',
                    items: {
                        storage: product.specs.storage,
                        color: product.specs.color,
                        camera: product.specs.camera,
                        battery: product.specs.battery
                    }
                };
            } else { // iPad hoặc Mac
                specsDisplay = {
                    type: 'other',
                    items: {
                        chip: product.specs.chip,
                        ram: product.specs.ram,
                        storage: product.specs.storage,
                        screen: product.specs.screen,
                        battery: product.specs.battery,
                        weight: product.specs.weight
                    }
                };
            }

            // Lấy các sản phẩm tương tự
            const relatedProducts = await Product.find({
                category: product.category,
                productId: { $ne: req.params.productID }
            }).limit(4);

            const formattedRelatedProducts = relatedProducts.map(prod => ({
                productId: prod.productId,
                name: prod.name,
                price: prod.price.toLocaleString() + "đ",
                image: prod.image,
                discount: prod.discount,
                installment: prod.installment,
                oldPrice: prod.oldPrice ? prod.oldPrice.toLocaleString() + "đ" : null
            }));

            res.render("productDetail", {
                layout: "category",
                hideBanner: true,
                hideNavbar: true,
                name: product.name,
                price: product.price.toLocaleString() + "đ",
                image: product.image,
                description: product.description,
                category: product.category,
                stock: product.stock,
                specsDisplay: specsDisplay,
                products: formattedRelatedProducts
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }
}


export default new ProductController();
