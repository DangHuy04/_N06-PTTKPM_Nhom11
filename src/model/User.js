import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,  // Tên người dùng
  },
  email: {
    type: String,
    required: true,
    unique: true,    // Email là duy nhất
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,  // Bắt buộc nhập SĐT
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // Thêm trường avatar
  avatar: {
    type: String,
    default: '../img/login_icon.png' // Đường dẫn mặc định
  },
  // Thêm trường address
  address: {
    type: String,
    default: ''
  }
});

const User = mongoose.model('User', userSchema);
export default User;
