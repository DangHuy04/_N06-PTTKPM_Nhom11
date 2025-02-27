import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] }, // Thêm mảng hình ảnh bổ sung
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  variants: [{
    storage: String,
    color: String,
    price: Number,
    image: String,
    stock: Number
  }],
  specs: {
    // Các trường ban đầu (iPhone specs, iPad và Mac specs)
    storage: [String],
    color: [String],
    camera: String,
    battery: String,
    chip: String,
    ram: String,
    screen: String,
    weight: String,
    // Các trường bổ sung cho thông số kỹ thuật chi tiết
    cpu: { type: String },
    sim: { type: String },
    connectivity: { type: String },
    designWeight: { type: String },
    batteryCharging: { type: String },
    additionalInfo: { type: String }
  },
  discount: String,
  installment: String,
  oldPrice: Number,
  tags: Array,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
