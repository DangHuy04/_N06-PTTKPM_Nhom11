class homeController {
    index(req, res) {
        res.render("home", {
            title: "Appstore - iPhone",
            banners: [
                "../img/tv1.jpg",
                "../img/tv2.jpg",
                "../img/tv3.jpg",
                "../img/tv4.jpg"
            ],
            products: [
                {
                    name: "iPhone 15 128GB",
                    price: "18.990.000đ",
                    oldPrice: "20.990.000đ",
                    discount: "Giảm 10%",
                    image: "../img/ipad-2.jpg"
                },
                {
                    name: "iPhone 15 Plus 128GB",
                    price: "21.690.000đ",
                    oldPrice: "23.990.000đ",
                    discount: "Giảm 9%",
                    image: "../img/ipad-2.jpg"
                }
            ]
        });
    }
}

module.exports = new homeController();