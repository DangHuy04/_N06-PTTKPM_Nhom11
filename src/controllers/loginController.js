import bcrypt from 'bcrypt';
import User from '../model/User.js';

const authLogin = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({ success: false, message: 'Thông tin đăng nhập không đúng!'})
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Thông tin đăng nhập không đúng!' });
        }

        return res.redirect('/');
    } catch (error) {
        console.error('Lỗi đăng nhập: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default authLogin;