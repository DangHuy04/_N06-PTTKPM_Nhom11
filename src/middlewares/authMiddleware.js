const authMiddleware = (req, res, next) => {
    if (!req.session.user) {  // Kiểm tra xem có user trong session không
        return res.status(401).json({ success: false, message: "Bạn cần đăng nhập để sử dụng giỏ hàng" });
    }
    next();
};
export default authMiddleware;