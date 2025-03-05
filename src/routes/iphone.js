import express from 'express';
import iphoneController from '../controllers/iphoneController.js';
import multer from 'multer';

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/reviews')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.get('/', iphoneController.index);
router.post('/reviews', upload.single('image'), iphoneController.addReview);

export default router;
