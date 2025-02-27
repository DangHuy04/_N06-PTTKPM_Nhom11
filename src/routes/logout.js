// routes/logout.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error('Lỗi khi đăng xuất:', err);
            return res.status(500).send('Lỗi server');
        }
        res.redirect('/');
    });
});

export default router;
