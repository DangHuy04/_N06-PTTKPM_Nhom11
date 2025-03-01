// reviewRoutes.js
import express from 'express';
import multer from 'multer';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

// Cấu hình multer cho upload ảnh đánh giá
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/reviews');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Route POST tạo đánh giá
router.post('/', upload.single('image'), reviewController.createReview);

export default router;
