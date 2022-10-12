const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
require('./config/mongoose')
const routes = require('./routes')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride("_method"))

app.use(routes)


// // 顯示全部餐廳
// app.get('/', (req, res) => {
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(error => console.log(error))
// })



app.listen(port, () => {
  console.log(`The restaurant list project is running on the http:localhost:${port}.`)
})