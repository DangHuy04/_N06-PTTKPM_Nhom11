
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

const route = require('./routes')

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

app.listen(port, () => {
  console.log(`Running app on port ${port} 🚀`)
})

// Route init
route(app)
