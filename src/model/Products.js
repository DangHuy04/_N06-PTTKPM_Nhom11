import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productId: String,
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String,
    stock: Number,
    specs: Object,
});

const Product = mongoose.model('Product',productSchema);
export default Product;