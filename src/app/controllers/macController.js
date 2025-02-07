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
                ]
            }
        });
    }
}
module.exports = new MacController();