class IpadController {
    index(req, res) {
        res.render('ipad', {
            banners: [
                "../img/banner_home_1.png",
                "../img/banner_home_2.png",
                "../img/banner_home_3.png",
                "../img/banner_home_4.png",
                "../img/banner_home_5.png",
                "../img/banner_home_6.png",
                "../img/banner_home_7.png",
            ],
            series: [ "iPad 10", "iPad Air M2", "iPad Pro M4", "iPad Mini", "iPad 9", "iPad Pro M1", "Phụ Kiện iPad" ],
            ipad: {
                title: "iPad",
                products: [
                    {
                        name: "iPad Pro 2024",
                        price: "22.990.000đ",
                        oldPrice: "25.990.000đ",
                        discount: "Giảm 12%",
                        image: "../img/ipad.png"
                    },
                    {
                        name: "iPad Pro 2024",
                        price: "22.990.000đ",
                        oldPrice: "25.990.000đ",
                        discount: "Giảm 12%",
                        image: "../img/ipad.png"
                    },
                    {
                        name: "iPad Pro 2024",
                        price: "22.990.000đ",
                        oldPrice: "25.990.000đ",
                        discount: "Giảm 12%",
                        image: "../img/ipad.png"
                    },
                    {
                        name: "iPad Pro 2024",
                        price: "22.990.000đ",
                        oldPrice: "25.990.000đ",
                        discount: "Giảm 12%",
                        image: "../img/ipad.png"
                    },
                ],
                infoSections: [
                    { 
                        img: '../img/ipad.png',
                        title: 'Tìm iPad phù hợp với bạn',
                        link: '/compare',
                        linkText: 'So sánh các iPad ›'
                    },
                    { 
                        img: '../img/ipad.png',
                        title: 'Phụ kiện iPad thường mua kèm',
                        link: '/accessories',
                        linkText: 'Tìm phụ kiện ›'
                    }
                ],
                aboutSections: [
                    {
                        title: 'bla bla',
                        content: 'ble ble'
                    }
                ]
            },
        });
    }
}
module.exports = new IpadController();
