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
      const averageRating = totalReviews ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 0;

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
              img: '../img/find-ip.png',
              title: 'Tìm iPhone phù hợp với bạn',
              link: '/compare',
              linkText: 'So sánh các iPhone ›'
            },
            {
              img: '../img/phukien-dikem-ip.png',
              title: 'Phụ kiện iPhone thường mua kèm',
              link: '/accessories',
              linkText: 'Tìm phụ kiện ›'
            }
          ],
          aboutSections: [
            {
              title1: 'Lịch sử hình thành, phát triển của iPhone',
              content1: 'iPhone là dòng điện thoại thông minh được phát triển từ Apple Inc, được ra mắt lần đầu tiên bởi Steve Jobs và mở bán năm 2007. Bên cạnh tính năng của một máy điện thoại thông thường, iPhone còn được trang bị màn hình cảm ứng, camera, khả năng chơi nhạc và chiếu phim, trình duyệt web... Phiên bản thứ hai là iPhone 3G ra mắt tháng 7 năm 2008, được trang bị thêm hệ thống định vị toàn cầu, mạng 3G tốc độ cao. Trải qua 15 năm tính đến nay đã có đến 34 mẫu iPhone được sản xuất từ dòng 2G cho đến iPhone 13 Pro Max và Apple là một trong những thương hiệu điện thoại được yêu thích và sử dụng phổ biến nhất trên thế giới.',
              title2: 'Các dòng iPhone phổ biến hiện nay',
              content2: 'Hiện nay, iPhone đã phát triển đến thế hệ thứ 16 với các mẫu như iPhone 16 Pro Max, iPhone 16 Pro, iPhone 16, iPhone 16 Mini. Đây là những sản phẩm cao cấp, được trang bị nhiều công nghệ mới và hiện đại nhất của Apple. Ngoài ra, iPhone còn có các dòng sản phẩm khác như iPhone 15, iPhone 14, iPhone 13, iPhone 12, iPhone 11, iPhone SE... với nhiều mức giá và cấu hình khác nhau để phù hợp với nhu cầu sử dụng của người tiêu dùng.',
            }
          ],
          reviews: {
            averageRating: averageRating.toFixed(1),
            totalReviews: totalReviews,
            ratingCounts: ratingCounts.map((count, index) => ({
              stars: index + 1,
              percentage: totalReviews ? (count / totalReviews * 100) : 0,
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
        category: "iphone", // Đảm bảo truyền biến category
        user: req.session.user // Truyền thông tin user
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

      // Tạo mới review, thêm avatar từ session nếu có
      const review = new Review({
        category: 'iphone',
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

export default new iphoneController();
