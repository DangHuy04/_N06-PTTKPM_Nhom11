import User from "../model/User.js" 
import bcrypt from 'bcrypt';

// Hàm kiểm tra thông tin đăng kí phía backend
const validateForm = (name, email, password, phone) => {
    if (!name.trim()) return { valid: false, message: "Tên không được để trống" };
    if (!/^\S+@\S+\.\S+$/.test(email)) return { valid: false, message: "Email không hợp lệ" };
    if (password.length < 6) return { valid: false, message: "Mật khẩu phải có ít nhất 6 ký tự" };
    if (!/^\d+$/.test(phone)) return { valid: false, message: "Số điện thoại chỉ được chứa số" };

    return { valid: true };
}

const postCreateUser = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body; // Tạo các biến để lưu thông tin người dùng vào ( để xử lý )
        const validation = validateForm(name, email, password, phone);
        
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).send('Email đã tồn tại!');
        }

        // Kiểm tra tính hợp lệ của input
        if(!validation.valid) return res.status(400).json({message: validation.message});
        
        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Lưu thông tin đăng kí vào DB
        const newUser = new User({name, email, password: hashedPassword, phone});
        await newUser.save();
        res.status(201).send('Đăng kí thành công');

    } catch (error) {
        console.error('Lỗi đăng kí: ', error);
        res.status(500).send('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
}

export default postCreateUser;