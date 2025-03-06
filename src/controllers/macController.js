import Product from "../model/Products.js";
import Review from "../model/Reviews.js";


class macController {
    async index(req, res) {
        try {
            // Lấy tất cả sản phẩm Mac từ database
            const macs = await Product.find({ category: "mac" });

            // Lấy đánh giá cho category mac
            const reviews = await Review.find({ category: "mac" }).sort({ createdAt: -1 });

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

            res.render('mac', {
                layout: "category",
                title: "Mac",
                banners: [
                    "../img/banner_APsr-T2_.png",
                    "../img/banner_home_2.png",
                    "../img/banner_home_3.png",
                    "../img/banner_home_4.png",
                    "../img/banner_home_5.png",
                    "../img/banner_home_6.png",
                    "../img/banner_home_7.png",
                ],
                series: ["Tất cả", "MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio", "Mac Pro"],
                mac: {
                    title: "Mac",
                    products: formatProducts(macs),
                    infoSections: [
                        {
                            img: '../img/find-mac.png',
                            title: 'Tìm Mac phù hợp với bạn',
                            link: '/compare',
                            linkText: 'So sánh các Mac ›'
                        },
                        {
                            img: '../img/phukien-dikem-mac.png',
                            title: 'Phụ kiện Mac thường mua kèm',
                            link: '/accessories',
                            linkText: 'Tìm phụ kiện ›'
                        }
                    ],
                    aboutSections: [
                        {
                            title1: 'Giới thiệu về Apple Mac',
                            content1: 'Apple Mac là dòng máy tính của thương hiệu Apple Inc. phổ biến trên toàn thế giới và được đông đảo người dùng yêu thích. Tính đến thời điểm hiện tại, Apple mang đến cho người dùng 5 dòng sản phẩm về Mac, đó là: MacBook, iMac, Mac mini, Mac Pro, Mac Studio và Displays. Đây đều là những sản phẩm vô cùng nổi tiếng trên thị trường và mang đến cho người dùng những trải nghiệm vô cùng tuyệt vời.',
                            title2: 'Giới thiệu về MacBook',
                            content2: 'MacBook là dòng máy tính xách tay của Apple Inc. sản xuất và phát triển. Đặc trưng của dòng này là thiết kế sang trọng cùng trải nghiệm mượt mà, mà nó đem lại nhờ chạy hệ điều hành macOS – hệ điều hành do chính Apple phát triển. MacBook có 2 dòng sản phẩm chính là MacBook Air và MacBook Pro. Ngoài ra, Apple còn phát triển thêm dòng MacBook M1 sử dụng con chip Apple Silicon M1 do chính Apple sản xuất (trước đó họ sử dụng chip Intel hoặc AMD – một bên thứ 3 cung cấp chipset CPU).'
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
                category: "mac",
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
                category: 'mac',
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

export default new macController();