import Product from "../model/Products.js";
import Review from "../model/Reviews.js";

class iphoneController {
    async index(req, res) {
        try {
            // Lấy tất cả sản phẩm iPhone từ database
            const iphones = await Product.find({ category: "iphone" });

            // Lấy đánh giá cho category iPhone
            const reviews = await Review.find({ category: "iphone" }).sort({ createdAt: -1 });

            // Tính toán thống kê đánh giá
            const totalReviews = reviews.length;
            const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews || 0;

            // Tính toán số lượng cho mỗi rating
            const ratingCounts = Array(5).fill(0);
            reviews.forEach(review => {
                ratingCounts[review.rating - 1]++;
            });

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
                series: ["Tất cả", "iPhone 16 series", "iPhone 15 series", "iPhone 14 series", "iPhone 13 series", "iPhone 12 series", "iPhone 11 series", "iPhone SE"],
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
                        averageRating: averageRating.toFixed(1),
                        totalReviews: totalReviews,
                        ratingCounts: ratingCounts.map((count, index) => ({
                            stars: index + 1,
                            percentage: (count / totalReviews * 100) || 0,
                            count: count
                        })),
                        list: reviews.map(review => ({
                            id: review._id,
                            name: review.name,
                            rating: review.rating,
                            comment: review.comment,
                            createdAt: review.createdAt.toLocaleDateString(),
                            image: review.image
                        }))
                    }
                },
                user: req.session.user // Truyền thông tin user để kiểm tra đăng nhập
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
        }
    }

    // Phương thức xử lý thêm đánh giá mới
    async addReview(req, res) {
        try {
            if (!req.session.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Vui lòng đăng nhập để đánh giá'
                });
            }

            const review = new Review({
                category: 'iphone',
                userId: req.session.user.id,
                name: req.session.user.name,
                rating: parseInt(req.body.rating),
                comment: req.body.comment,
                image: req.file ? `/uploads/reviews/${req.file.filename}` : null
            });

            await review.save();

            res.json({
                success: true,
                review: {
                    id: review._id,
                    name: review.name,
                    rating: review.rating,
                    comment: review.comment,
                    createdAt: review.createdAt.toLocaleDateString(),
                    image: review.image
                }
            });

        } catch (error) {
            console.error('Error adding review:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi thêm đánh giá'
            });
        }
    }
}

export default new iphoneController();
