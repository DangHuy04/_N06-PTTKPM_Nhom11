class IphoneController {
    index(req, res) {
        res.render('iphone', {
            title: 'iPhone Store',
            products: [
                { name: 'iPhone 16', price: '18,990,000đ', image: '/img/iphone16.png' },
                { name: 'iPhone 15', price: '16,990,000đ', image: '/img/iphone15.png' }
            ]
        });
    }
}
module.exports = new IphoneController();