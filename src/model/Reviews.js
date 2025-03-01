// Reviews.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  category: { type: String, required: true },    // Ví dụ: "iphone", "ipad", "mac"
  productId: { type: String },                     // Nếu đánh giá cho sản phẩm cụ thể
  userId: { type: String, required: true },
  name: { type: String, required: true },          // Lấy từ session (username)
  avatar: { type: String, default: '' },           // Avatar của người đánh giá
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
