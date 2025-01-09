import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/apple-store');
        console.log("Kết nối cơ sở dữ liệu thành công");
    } catch (error) {
        console.log("Kết nối cơ sở dữ liệu thất bại: ",error.message);
    }
};

export default connectDB;