import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            prodID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: { type: String },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Cập nhật giá sản phẩm trước khi lưu (nếu cần)
cartSchema.pre('save', async function(next) {
    for (let item of this.items) {
        if (!item.price) {
            const product = await mongoose.model('Product').findById(item.prodID);
            if (product) {
                item.price = product.price;
            }
        }
    }
    this.totalAmount = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
