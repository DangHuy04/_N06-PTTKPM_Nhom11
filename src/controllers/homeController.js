import Product from "../model/Products.js";

class homeController {
    async index(req, res) {
        try {
            const sliderBanners = [
                "../img/banner_home_1.png",
                "../img/banner_home_2.png",
                "../img/banner_home_3.png",
                "../img/banner_home_4.png",
                "../img/banner_home_5.png",
                "../img/banner_home_6.png",
            ];

            const groupedSliderBanners = [];
            for (let i = 0; i < sliderBanners.length; i += 3) {
                groupedSliderBanners.push(sliderBanners.slice(i, i + 3));
            }
            // Lấy tối đa 4 sản phẩm cho mỗi danh mục
            const [iphones, ipads, macs] = await Promise.all([
                Product.find({ category: "iphone" }).limit(4),
                Product.find({ category: "ipad" }).limit(4),
                Product.find({ category: "mac" }).limit(4)
            ]);


            // Hàm xử lý danh sách sản phẩm
            const formatProducts = (products) =>
                products.map(product => ({
                    name: product.name,
                    productId: product.productId,
                    price: product.price.toLocaleString() + "đ",
                    oldPrice: product.oldPrice ? product.oldPrice.toLocaleString() + "đ" : "",
                    discount: product.discount || "",
                    installment: product.installment || "",
                    image: product.image
                }));
            // Render ra giao diện
            res.render("home", {
                banner: "../img/banner-footer.png",
                layout: "home",
                title: "Apple Store",
                banners: [
                    "../img/banner_home_1.png",
                    "../img/banner_home_2.png",
                    "../img/banner_home_3.png",
                    "../img/banner_home_4.png",
                    "../img/banner_home_5.png",
                    "../img/banner_home_6.png",
                    "../img/banner_home_7.png",
                ],
                sliderBanners: groupedSliderBanners,
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
