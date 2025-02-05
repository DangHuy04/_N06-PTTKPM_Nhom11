/*
import express from 'express';
import { connectDB } from './config/db';
*/


const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')

//static file
app.use(express.static(path.join(__dirname, 'public')))

//Connect DB
//connectDB('mongodb://localhost:27017/my_db');

//HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.listen(port, () => {
  console.log(`Running app on port ${port} 🚀`)
})

// Route init
route(app)

app.get('/', (req, res) => {
  res.render('home')
})

app.get("/iphone", (req, res) => {
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
});

// Route cho trang iPad
app.get("/ipad", (req, res) => {
  res.render("home", {
      title: "Appstore - iPad",
      banners: [
        "../img/tv1.jpg",
        "../img/tv2.jpg",
        "../img/tv3.jpg",
        "../img/tv4.jpg"
      ],
      products: [
          {
              name: "iPhone 14 128GB",
              price: "15.990.000đ",
              oldPrice: "17.990.000đ",
              discount: "Giảm 11%",
              image: "../img/ipad-2.jpg"
          },
          {
              name: "iPhone 14 Plus 128GB",
              price: "18.490.000đ",
              oldPrice: "20.490.000đ",
              discount: "Giảm 10%",
              image: "../img/ipad-2.jpg"
          }
      ]
  });
});

// Route cho trang mac
app.get("/mac", (req, res) => {
  res.render("home", {
      title: "Appstore - Mac",
      banners: [
          "../img/tv1.jpg",
          "../img/tv2.jpg",
          "../img/tv3.jpg",
          "../img/tv4.jpg"
      ],
      products: [
          {
              name: "iPad Air 5",
              price: "13.990.000đ",
              oldPrice: "15.490.000đ",
              discount: "Giảm 10%",
              image: "../img/ipad-1.jpg"
          },
          {
              name: "iPad Pro M2",
              price: "22.990.000đ",
              oldPrice: "24.990.000đ",
              discount: "Giảm 8%",
              image: "../img/ipad-2.jpg"
          }
      ]
  });
});
