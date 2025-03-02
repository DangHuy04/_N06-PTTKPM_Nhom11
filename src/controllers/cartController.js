import Product from "../model/Products.js";
import User from '../model/User.js';

class cartController {
    async index(req, res) {
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
}

export default new cartController();