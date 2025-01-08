const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
//static file
app.use(express.static(path.join(__dirname, 'public')))

//HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/store', (req, res) => {
  res.render('store', {
      products: [
          { name: 'Mac', image: '../img/macos.jpg' },
          { name: 'iPhone', image: '../img/iphone15xanh.jpg' }
      ],
      newProducts: [
          { name: 'iPhone 15 Pro', image: '../img/iphone15.jpg', description: 'Titan', price: '28.999.000đ' }
      ],
      support: [
          { title: 'Chuyên gia', image: '../img/tv1.jpg', description: 'Hỗ trợ 24/7' }
      ],
      experiences: [
          { title: 'Apple TV+', image: '../img/tv2.jpeg', description: 'Tặng 3 tháng miễn phí' }
      ],
      specialStores: [
          { title: 'Giáo dục', image: '../img/tv3.jpg', description: 'Ưu đãi cho sinh viên' }
      ]
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
