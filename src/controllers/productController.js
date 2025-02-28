import Product from "../model/Products.js";

class ProductController {
    async show(req, res) {
        try {
            const product = await Product.findOne({ productId: req.params.productID });

            if (!product) {
                return res.status(404).send("Sản phẩm không tồn tại");
            }

            // Tạo đối tượng specsDisplay với đầy đủ các trường thông số kỹ thuật
            const specsDisplay = {
                type: product.category, // hoặc đặt kiểu riêng nếu cần
                items: {
                    storage: product.specs.storage,
                    color: product.specs.color,
                    camera: product.specs.camera,
                    battery: product.specs.battery,
                    chip: product.specs.chip,
                    ram: product.specs.ram,
                    screen: product.specs.screen,
                    weight: product.specs.weight,
                    cpu: product.specs.cpu,
                    sim: product.specs.sim,
                    connectivity: product.specs.connectivity,
                    designWeight: product.specs.designWeight,
                    batteryCharging: product.specs.batteryCharging,
                    additionalInfo: product.specs.additionalInfo
                }
            };

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
                products: formattedRelatedProducts,
                variants: JSON.stringify(product.variants),
                images: product.images // đảm bảo truyền mảng images để hiển thị trong tab Mô tả
            });

        } catch (error) {
            console.error('Error:', error);
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }
}

export default new ProductController();
