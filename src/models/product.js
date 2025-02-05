const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    oldPrice: Number,
    discount: Number,
    installment: String,
    imageUrl: String,
    category: String
});