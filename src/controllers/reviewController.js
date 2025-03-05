// reviewController.js
import Review from '../model/Reviews.js';

class ReviewController {
  async createReview(req, res) {
    try {
      // Kiểm tra đăng nhập và đảm bảo session có trường username
      if (!req.session.user || !req.session.user.username) {
        return res.status(401).json({
          success: false,
          message: 'Vui lòng đăng nhập để đánh giá'
        });
      }

      // Lấy dữ liệu từ form
      const { category, productId, rating, comment } = req.body;
      
      // Tạo mới review, lấy thông tin user từ session
      const review = new Review({
        category: category,                   // Ví dụ: "iphone"
        productId: productId || null,
        userId: req.session.user.id,
        name: req.session.user.username,      // Sử dụng username từ session
        avatar: req.session.user.avatar || '', // Lấy avatar từ session (nếu có)
        rating: parseInt(rating),
        comment,
        image: req.file ? `/uploads/reviews/${req.file.filename}` : null
      });

      await review.save();

      res.json({
        success: true,
        review: {
          id: review._id,
          name: review.name,
          avatar: review.avatar,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt.toLocaleDateString(),
          image: review.image
        }
      });
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tạo đánh giá'
      });
    }
  }
}

export default new ReviewController();
