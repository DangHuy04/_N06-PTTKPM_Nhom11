import Product from "../model/Products.js";

class homeController {
    async index(req, res) {
        try {
            // Lấy tất cả sản phẩm theo từng loại
            const [iphones, ipads, macs] = await Promise.all([
                Product.find({ category: "iphone" }),
                Product.find({ category: "ipad" }),
                Product.find({ category: "mac" })
            ]);

            // Hàm xử lý danh sách sản phẩm
            const formatProducts = (products) =>
                products.map(product => ({
                    name: product.name,
                    price: product.price.toLocaleString() + "đ",
                    oldPrice: product.oldPrice ? product.oldPrice.toLocaleString() + "đ" : "",
                    discount: product.discount || "",
                    installment: product.installment || "",
                    image: product.image
                }));

            // Render ra giao diện
            res.render("home", {
                banners: [
                    "../img/banner_home_1.png",
                    "../img/banner_home_2.png",
                    "../img/banner_home_3.png",
                    "../img/banner_home_4.png",
                    "../img/banner_home_5.png",
                    "../img/banner_home_6.png",
                    "../img/banner_home_7.png",
                ],
                iphone: {
                    title: "iPhone",
                    products: formatProducts(iphones)
                },
                ipad: {
                    title: "iPad",
                    products: formatProducts(ipads)
                },
                mac: {
                    title: "Mac",
                    products: formatProducts(macs)
                }
            });

        } catch (error) {
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }
}

export default new homeController();
