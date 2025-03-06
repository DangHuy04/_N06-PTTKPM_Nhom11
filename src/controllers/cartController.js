import Cart from "../model/Cart.js";
import Product from '../model/Products.js';
import mongoose from 'mongoose';

const index = async (req, res) => {
    try {
        // Lấy thông tin người dùng
        const userId = req.session.user.id;
        
        // Lấy thông tin giỏ hàng của người dùng
        const cart = await Cart.findOne({ userId: userId });

        // Nếu giỏ hàng không tồn tại hoặc không có sản phẩm
        if (!cart || !cart.items.length) {
            return res.render("empty_cart", {
                title: "Giỏ hàng",
                layout: "cart"
            });
        }

        // Lấy danh sách sản phẩm trong giỏ hàng
        const prodIDs = cart.items.map(item => item.prodID);
        const products = await Product.find({ _id: { $in: prodIDs } });

        const Amount = cart.totalAmount.toLocaleString() + "đ";

        // Xử lý danh sách sản phẩm
        const formatProducts = (products, cart) => 
        products.map(product => {
            // Tìm sản phẩm trong giỏ hàng theo ID
            const cartItem = cart.items.find(item => item.prodID.toString() === product._id.toString());
            const quantity = cartItem ? cartItem.quantity : 0;
            const totalPrice = product.price * quantity;

            return {
                id: product._id,
                name: product.name,
                price: product.price.toLocaleString() + "đ",
                image: product.image,
                color: product.specs.color,
                quantity, 
                totalPrice: totalPrice.toLocaleString() + "đ", // Tổng tiền cho từng sản phẩm
                Amount
            };
        });

        res.render("cart", {
            title: "Giỏ hàng",
            layout: "cart",
            Amount,
            products: formatProducts(products, cart)
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const addToCart = async(req, res) => {
    try {
        const { prodID , quantity } = req.body;
        const userId =  req.session.user.id;
         
        const product = await mongoose.model('Product').findById(prodID);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await mongoose.model('Cart').findOne({ userId });

        if (!cart) {
            cart = new mongoose.model('Cart')({ userId, items: [], totalAmount: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.prodID && item.prodID.toString() === prodID.toString()
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ prodID, quantity, price: product.price });
        }

        await cart.save();

        res.status(200).json({ success: true, message: "Cart updated successfully", cart });

    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
}

const updateCart = async (req, res) => {
    try {
        const { prodID, quantity, remove } = req.body;
        const userId = req.session.user.id;

        let cart = await mongoose.model('Cart').findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.prodID && item.prodID.toString() === prodID.toString());

        if (itemIndex > -1) {
            if (remove || quantity <= 0) {
                cart.items.splice(itemIndex, 1); // Xóa sản phẩm khỏi giỏ hàng
            } else {
                cart.items[itemIndex].quantity = quantity; // Cập nhật số lượng
            }

            await cart.save();
            return res.status(200).json({ success: true, message: "Cart updated successfully", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
};

export { index , addToCart , updateCart };