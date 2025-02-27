import bcrypt from 'bcrypt';
import User from '../model/User.js';

const authLogin = async(req, res) => {
    const {account, password} = req.body;

    // Validation
    if (!account || !password) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập đầy đủ thông tin'
        });
    }

    // Validate email format nếu account là email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (account.includes('@') && !emailRegex.test(account)) {
        return res.status(400).json({
            success: false,
            message: 'Email không hợp lệ'
        });
    }

    // Validate phone format nếu account là số điện thoại
    const phoneRegex = /^0\d{9}$/;  // Bắt đầu bằng số 0 và có tổng 10 số
    if (!account.includes('@')) {
        if (!phoneRegex.test(account)) {
            return res.status(400).json({
                success: false,
                message: 'Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số'
            });
        }
    }

    try {
        // Tìm user theo email hoặc phone
        const user = await User.findOne({
            $or: [
                {email: account},
                {phone: account}
            ]
        });

        if(!user) {
            return res.status(400).json({
                success: false, 
                message: 'Thông tin đăng nhập không đúng!'
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Thông tin đăng nhập không đúng!'
            });
        }

        // Lưu thông tin user vào session
        req.session.user = {
            id: user._id,
            email: user.email,
            username: user.name,
            phone: user.phone,
            avatar: user.avatar,
            address: user.address,
        };

        return res.redirect('/');
    } catch (error) {
        console.error('Lỗi đăng nhập: ', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export default authLogin;