const Product = mongoose.model('Product', {
    name: String,
    price: String,
    oldPrice: String,
    discount: String,
    image: String
});