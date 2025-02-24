import Product from "../model/Products.js";

class iphoneController {
    async index(req, res) {
        try {
            // Lấy tất cả sản phẩm iPhone từ database
            const iphones = await Product.find({ category: "iphone" });

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

            res.render('iphone', {
                layout: "category",
                title: "iPhone",
                banners: [
                    "../img/banner_iphone_16e.png",
                    "../img/banner_home_2.png",
                    "../img/banner_home_3.png",
                    "../img/banner_home_4.png",
                    "../img/banner_home_5.png",
                    "../img/banner_home_6.png",
                    "../img/banner_home_7.png",
                ],
                series: ["iPhone 16 series", "iPhone 15 series", "iPhone 14 series", "iPhone 13 series", "iPhone 12 series", "iPhone 11 series", "iPhone SE"],
                iphone: {
                    title: "iPhone",
                    products: formatProducts(iphones),
                    infoSections: [
                        {
                            img: '../img/iphone16.png',
                            title: 'Tìm iPhone phù hợp với bạn',
                            link: '/compare',
                            linkText: 'So sánh các iPhone ›'
                        },
                        {
                            img: '../img/iphone16.png',
                            title: 'Phụ kiện iPhone thường mua kèm',
                            link: '/accessories',
                            linkText: 'Tìm phụ kiện ›'
                        }
                    ],
                    aboutSections: [
                        {
                            title: 'bla bla',
                            content: 'ble ble'
                        }
                    ],
                    reviews: {
                        averageRating: 5,
                        totalReviews: 7,
                        ratingCounts: [
                            { stars: 5, percentage: 100, count: 7 },
                            { stars: 4, percentage: 0, count: 0 },
                            { stars: 3, percentage: 0, count: 0 },
                            { stars: 2, percentage: 0, count: 0 },
                            { stars: 1, percentage: 0, count: 0 }
                        ],
                        list: [
                            // Các review có thể được lấy từ database trong tương lai
                            {
                                id: 1,
                                name: "khánh",
                                rating: 5,
                                comment: "ngon",
                                createdAt: "2023-09-21",
                                image: null
                            },
                            // ... các review khác
                        ]
                    }
                }
            });
        } catch (error) {
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }

    async addReview(req, res) {
        try {
            const { name, rating, comment } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : null;

            const newReview = {
                id: Date.now(),
                name,
                rating: parseInt(rating),
                comment,
                createdAt: new Date().toISOString(),
                image
            };

            res.json({
                success: true,
                review: newReview
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi thêm đánh giá'
            });
        }
    }
}

export default new iphoneController();
