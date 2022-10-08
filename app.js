const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

app.use(express.static('public'))



// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})



app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => item.name.toLowerCase().trim().includes(keyword) || item.category.toLowerCase().trim().includes(keyword))
  res.render('index', {restaurants: restaurants, keyword: keyword})
})

app.listen(port, () => {
  console.log(`The restaurant list project is running on the http:localhost:${port}.`)
})