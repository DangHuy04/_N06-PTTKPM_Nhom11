// routes/profileRouter.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import User from '../model/User.js';

const router = express.Router();

// Cấu hình multer để upload file vào thư mục public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Middleware kiểm tra đăng nhập
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.get('/', requireLogin, async (req, res) => {
    try {
      const userId = req.session.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.redirect('/login');
      }
      res.render('profile', { layout: '' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Lỗi server');
    }
  });

// POST /profile: Cập nhật thông tin và upload avatar
router.post('/', requireLogin, upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { name, phone, address } = req.body;
    const updatedData = { name, phone, address };
    // Nếu có file avatar mới, cập nhật đường dẫn
    if (req.file) {
      updatedData.avatar = '/uploads/' + req.file.filename;
    }

    await User.findByIdAndUpdate(userId, updatedData);

    // Cập nhật lại session nếu cần
    req.session.user.name = name;
    if (req.file) {
      req.session.user.avatar = updatedData.avatar;
    }

    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
});

export default router;
