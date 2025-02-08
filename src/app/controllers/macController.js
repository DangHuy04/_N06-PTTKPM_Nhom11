class MacController {
    index(req, res) {
        res.render('mac', {
            banners: [
                "../img/banner_home_1.png",
                "../img/banner_home_2.png",
                "../img/banner_home_3.png",
                "../img/banner_home_4.png",
                "../img/banner_home_5.png",
                "../img/banner_home_6.png",
                "../img/banner_home_7.png",
            ],
            series: ["MacBook Pro M4", "MacBook Air", "iMac", "Mac Mini", "MacBook Pro", "Mac Pro", "Mac Studio"],
            mac: {
                title: "Mac",
                products: [
                    {
                        name: "MacBook Pro 16\"",
                        price: "45.990.000đ",
                        oldPrice: "50.990.000đ",
                        discount: "Giảm 8%",
                        image: "../img/mac.png"
                    },
                    {
                        name: "MacBook Pro 16\"",
                        price: "45.990.000đ",
                        oldPrice: "50.990.000đ",
                        discount: "Giảm 8%",
                        image: "../img/mac.png"
                    },
                    {
                        name: "MacBook Pro 16\"",
                        price: "45.990.000đ",
                        oldPrice: "50.990.000đ",
                        discount: "Giảm 8%",
                        image: "../img/mac.png"
                    },
                    {
                        name: "MacBook Pro 16\"",
                        price: "45.990.000đ",
                        oldPrice: "50.990.000đ",
                        discount: "Giảm 8%",
                        image: "../img/mac.png"
                    },
                ],
                infoSections: [
                    {
                        img: '../img/mac.png',
                        title: 'Tìm Mac phù hợp với bạn',
                        link: '/compare',
                        linkText: 'So sánh các Mac ›'
                    },
                    {
                        img: '../img/mac.png',
                        title: 'Phụ kiện Mac thường mua kèm',
                        link: '/accessories',
                        linkText: 'Tìm phụ kiện ›'
                    }
                ],
                aboutSections: [
                    {
                        title: 'bla bla',
                        content: 'ble ble'
                    }
                ],
                reviews: {
                    averageRating: 5,
                    totalReviews: 7,
                    ratingCounts: [
                        { stars: 5, percentage: 100, count: 7 },
                        { stars: 4, percentage: 0, count: 0 },
                        { stars: 3, percentage: 0, count: 0 },
                        { stars: 2, percentage: 0, count: 0 },
                        { stars: 1, percentage: 0, count: 0 }
                    ],
                    list: [
                        {
                            id: 1,
                            name: "khánh",
                            rating: 5,
                            comment: "ngon",
                            createdAt: "2023-09-21",
                            image: null
                        },
                        {
                            id: 2,
                            name: "Nguyenvanphuong",
                            rating: 5,
                            comment: "Ok",
                            createdAt: "2023-07-26",
                            image: null
                        },
                        {
                            id: 3,
                            name: "Vu thi trang",
                            rating: 5,
                            comment: "Tot",
                            createdAt: "2023-07-12",
                            image: null
                        },
                        {
                            id: 4,
                            name: "Huệ Trần",
                            rating: 5,
                            comment: "đt sẵn hàng quá",
                            createdAt: "2023-06-01",
                            image: null
                        },
                        {
                            id: 5,
                            name: "minh",
                            rating: 5,
                            comment: "dq",
                            createdAt: "2023-05-30",
                            image: null
                        },
                        {
                            id: 6,
                            name: "Thành",
                            rating: 5,
                            comment: "good",
                            createdAt: "2023-05-30",
                            image: null
                        },
                        {
                            id: 7,
                            name: "Uyên",
                            rating: 5,
                            comment: "Sản phẩm các dòng iphone còn hàng nhiều",
                            createdAt: "2023-04-24",
                            image: null
                        }
                    ]
                }
            }
        });
    }

    // Thêm method để xử lý post review mới
    async addReview(req, res) {
        try {
            const { name, rating, comment } = req.body;
            const image = req.file ? `/uploads/${req.file.filename}` : null;

            // Tạo review mới với dữ liệu từ form
            const newReview = {
                id: Date.now(), // Tạm thời dùng timestamp làm id
                name,
                rating: parseInt(rating),
                comment,
                createdAt: new Date().toISOString(),
                image
            };

            // Trong thực tế, bạn sẽ lưu review vào database
            // Ở đây tôi return success response
            res.json({
                success: true,
                review: newReview
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi thêm đánh giá'
            });
        }
    }
}

module.exports = new MacController();