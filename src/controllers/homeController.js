class homeController {
    index(req, res) {
        res.render("home", {
            banners: [
                "../img/banner_home_1.png",
                "../img/banner_home_2.png",
                "../img/banner_home_3.png",
                "../img/banner_home_4.png",
                "../img/banner_home_5.png",
                "../img/banner_home_6.png",
                "../img/banner_home_7.png",
            ],
            series: [ "iPhone", "iPad", "Mac", "Watch", "Âm thanh", "Phụ kiện", "Máy cũ", "Dịch vụ" , "Tin tức"],  
            iphone: {
                title: "iPhone",
                products: [
                    {
                        name: "iPhone 16 128GB",
                        price: "18.990.000đ",
                        oldPrice: "20.990.000đ",
                        discount: "Giảm 10%",
                        image: "../img/iphone16.png"
                    },
                    {
                        name: "iPhone 16 128GB",
                        price: "18.990.000đ",
                        oldPrice: "20.990.000đ",
                        discount: "Giảm 10%",
                        image: "../img/iphone16.png"
                    },
                    {
                        name: "iPhone 16 128GB",
                        price: "18.990.000đ",
                        oldPrice: "20.990.000đ",
                        discount: "Giảm 10%",
                        image: "../img/iphone16.png"
                    },
                    {
                        name: "iPhone 16 128GB",
                        price: "18.990.000đ",
                        oldPrice: "20.990.000đ",
                        discount: "Giảm 10%",
                        image: "../img/iphone16.png"
                    },

                ]
            },
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
                ]
            },
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
                    },]
            }
        });
    }
}

export default new homeController(); 