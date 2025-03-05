import User from '../model/User.js';
import Cart from "../model/Cart.js";
import Product from '../model/Products.js';
import mongoose from 'mongoose';

const index = async(req, res) => {
    try {
        // Lấy thông tin người dùng
        const userId = req.session.user.id;
        const user = await User.findById(userId);
             
        res.render("cart", {
            title: "Giỏ hàng",
            layout: "cart",
            user: {
                username: user.name
            }
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

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
    
export { index , addToCart };