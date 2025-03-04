import User from '../model/User.js';
import Cart from "../model/Cart.js";
import Product from '../model/Products.js';
import mongoose from 'mongoose';

const index = async(req, res) => {
        try {
            // Lấy thông tin người dùng
            const userId = req.session.user.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.redirect('/login');
            }
            
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

        console.log("Product found:", product);

        let cart = await mongoose.model('Cart').findOne({ userId });

        if (!cart) {
            console.log("Creating new cart...");
            cart = new mongoose.model('Cart')({ userId, items: [], totalAmount: 0 });
        }

        console.log("Updating cart...");
        const itemIndex = cart.items.findIndex(item => 
            item.prodID && item.prodID.toString() === prodID.toString()
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ prodID, quantity, price: product.price });
        }

        cart.totalAmount = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        await cart.save();

        res.status(200).json({ message: "Cart updated successfully", cart });

    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
    }
}
    
export { index , addToCart };