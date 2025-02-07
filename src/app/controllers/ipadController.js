class IpadController {
    index(req, res) {
        res.render('ipad', {
            title: 'iPad Store',
            products: [
                { name: 'iPad Pro', price: '22,990,000đ', image: '/img/ipadpro.png' },
                { name: 'iPad Air', price: '18,990,000đ', image: '/img/ipadair.png' }
            ]
        });
    }
}
module.exports = new IpadController();
