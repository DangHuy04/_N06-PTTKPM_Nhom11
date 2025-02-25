import express from "express";
import Product from "../model/Products.js"; 

const router = express.Router();

// Tạo Object để định nghĩa breadcrumb cho danh mục
const categoryBreadcrumbs = {
    iphone: [{ name: "Trang chủ", path: "/" }, { name: "iPhone", path: "/iphone" }],
    ipad: [{ name: "Trang chủ", path: "/" }, { name: "iPad", path: "/ipad" }],
    mac: [{ name: "Trang chủ", path: "/" }, { name: "Mac", path: "/mac" }]
};

// Hàm lấy breadcrumb
const getBreadcrumb = async (slug) => {
    // Nếu slug là danh mục
    if (categoryBreadcrumbs[slug]) {
        return categoryBreadcrumbs[slug];
    }

    // Nếu slug là sản phẩm, tìm trong database
    const product = await Product.findOne({productId: slug });
    
    if (!product) {
        return null;
    }

    // Lấy breadcrumb theo danh mục của sản phẩm
    const baseBreadcrumb = categoryBreadcrumbs[product.category] || [{ name: "Trang chủ", path: "/" }];

    // Thêm tên sản phẩm vào breadcrumb
    return [...baseBreadcrumb, { name: product.name, path: `/${product.slug}` }];
};

// Route lấy breadcrumb
router.get("/:slug", async (req, res) => {
    const breadcrumb = await getBreadcrumb(req.params.slug);

    if (!breadcrumb) {
        return res.status(404).send("Không tìm thấy trang");
    }

    res.json({ breadcrumb });
});

export default router;
