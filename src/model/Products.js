import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String,
    stock: Number,
});

const Product = mongoose.model('Product',productSchema);
export default Product;