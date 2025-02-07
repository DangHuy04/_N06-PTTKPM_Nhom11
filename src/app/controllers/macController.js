class MacController {
    index(req, res) {
        res.render('mac', {
            title: 'Mac Store',
            products: [
                { name: 'MacBook Pro', price: '50,990,000đ', image: '/img/macbookpro.png' },
                { name: 'MacBook Air', price: '32,990,000đ', image: '/img/macbookair.png' }
            ]
        });
    }
}
module.exports = new MacController();