import Product from "../model/Products.js";
import Review from "../model/Reviews.js";

class ipadController {
    async index(req, res) {
        try {
            // Lấy tất cả sản phẩm iPad từ database
            const ipads = await Product.find({ category: "ipad" });

            // Lấy đánh giá cho category iPad
            const reviews = await Review.find({ category: "ipad" }).sort({ createdAt: -1 });

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

            res.render('ipad', {
                layout: "category",
                title: "iPad",
                banners: [
                    "../img/banner_home_1.png",
                    "../img/banner_home_2.png",
                    "../img/banner_home_3.png",
                    "../img/banner_home_4.png",
                    "../img/banner_home_5.png",
                    "../img/banner_home_6.png",
                    "../img/banner_home_7.png",
                ],
                series: ["Tất cả", "iPad 10", "iPad Air M2", "iPad Pro M4", "iPad Mini", "iPad 9", "iPad Pro M1", "Phụ Kiện iPad"],
                ipad: {
                    title: "iPad",
                    products: formatProducts(ipads),
                    infoSections: [
                        {
                            img: '../img/find-ipad.png',
                            title: 'Tìm iPad phù hợp với bạn',
                            link: '/compare',
                            linkText: 'So sánh các iPad ›'
                        },
                        {
                            img: '../img/phukien-dikem-ipad.png',
                            title: 'Phụ kiện iPad thường mua kèm',
                            link: '/accessories',
                            linkText: 'Tìm phụ kiện ›'
                        }
                    ],
                    aboutSections: [
                        {
                            title1: 'iPad là gì ?',
                            content1: 'iPad là máy tính bảng do Apple Inc. phát triển. Được công bố vào ngày 27 tháng 1 năm 2010, thiết bị này tạo ra một phân loại mới giữa điện thoại thông minh và máy tính xách tay. Tương tự về tính năng so với thiết bị nhỏ và yếu hơn là iPhone hoặc iPod touch, iPad cũng hoạt động trên cùng hệ điều hành iPhone OS đã được sửa đổi với giao diện được thiết kế lại để phù hợp với màn hình lớn.',
                            title2: 'Tại sao nên mua iPad ?',
                            content2: 'iPad được trang bị các tính năng tiện ích để phục vụ công việc, nhu cầu giải trí hiệu quả. Với màn hình Retina sắc nét, hiệu suất mạnh mẽ từ chip Apple Silicon, và hệ sinh thái ứng dụng phong phú, iPad là công cụ đa năng phù hợp cho mọi đối tượng người dùng. Thời lượng pin dài, khả năng kết nối Apple Pencil và Magic Keyboard giúp nâng cao năng suất làm việc. Thiết kế mỏng nhẹ, sang trọng cùng nhiều tùy chọn kích thước màn hình từ 8.3 inch đến 12.9 inch đáp ứng đa dạng nhu cầu sử dụng. iPad còn được Apple hỗ trợ cập nhật phần mềm lâu dài, đảm bảo thiết bị luôn được bảo mật và cập nhật tính năng mới nhất. Đặc biệt, với iPadOS được tối ưu riêng, iPad mang đến trải nghiệm đa nhiệm, đa phương tiện vượt trội so với các máy tính bảng thông thường khác trên thị trường.'                            
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
                            avatar: review.avatar, // thêm avatar vào mapping
                            rating: review.rating,
                            comment: review.comment,
                            createdAt: review.createdAt.toLocaleDateString(),
                            image: review.image
                        }))
                    }
                },
                category: "ipad",
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
                category: 'ipad',
                userId: req.session.user.id,
                name: req.session.user.name,
                avatar: req.session.user.avatar || '', // thêm avatar vào review
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
                    avatar: review.avatar, // truyền avatar mới lưu
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

export default new ipadController();
