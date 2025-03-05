// productController.js
import Product from "../model/Products.js";
import Review from "../model/Reviews.js";

class ProductController {
  async show(req, res) {
    try {
      const product = await Product.findOne({ productId: req.params.productID });
      if (!product) {
        return res.status(404).send("Sản phẩm không tồn tại");
      }

      // Truy vấn đánh giá theo productId (nếu review dành riêng cho sản phẩm) hoặc theo category
      const reviews = await Review.find({ productId: product.productId }).sort({ createdAt: -1 });
      
      // Tính toán thống kê đánh giá
      const totalReviews = reviews.length;
      const averageRating = totalReviews ? (reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1) : 0;
      const ratingCounts = Array(5).fill(0);
      reviews.forEach(review => {
        // Giả sử rating nằm trong khoảng 1-5
        ratingCounts[review.rating - 1]++;
      });
      const formattedRatingCounts = ratingCounts.map((count, index) => ({
        stars: index + 1,
        percentage: totalReviews ? (count / totalReviews * 100).toFixed(0) : 0
      }));

      // Lấy các sản phẩm tương tự (ví dụ)
      const relatedProducts = await Product.find({
        category: product.category,
        productId: { $ne: req.params.productID }
      }).limit(4);

      const formattedRelatedProducts = relatedProducts.map(prod => ({
        productId: prod.productId,
        name: prod.name,
        price: prod.price.toLocaleString() + "đ",
        image: prod.image,
        discount: prod.discount,
        installment: prod.installment,
        oldPrice: prod.oldPrice ? prod.oldPrice.toLocaleString() + "đ" : null
      }));

      res.render("productDetail", {
        layout: "category",
        hideBanner: true,
        hideNavbar: true,
        name: product.name,
        price: product.price.toLocaleString() + "đ",
        image: product.image,
        description: product.description,
        category: product.category,
        productId: product.productId,
        stock: product.stock,
        specsDisplay: {
          type: product.category,
          items: product.specs
        },
        products: formattedRelatedProducts,
        variants: JSON.stringify(product.variants),
        images: product.images,
        reviews: {
          averageRating,
          totalReviews,
          ratingCounts: formattedRatingCounts,
          list: reviews.map(review => ({
            id: review._id,
            name: review.name,
            avatar: review.avatar,  // avatar của người đánh giá
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt.toLocaleDateString(),
            image: review.image
          }))
        },
        user: req.session.user // truyền thông tin user từ session
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send("Lỗi khi lấy dữ liệu sản phẩm");
    }
  }
}

export default new ProductController();
