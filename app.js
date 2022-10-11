const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

app.use(express.static('public'))
console.log(process.env.MONGODB_URI2)

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


// 顯示全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
  // res.render('index', {restaurants: restaurantList.results})
})

// 檢視單一餐廳
app.get('/restaurants/:restaurant_id', (req, res) => {
  // const restaurant = Restaurant.find(item => item.id.toString() === req.params.restaurant_id)
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
  // res.render('show', {restaurant: restaurant})
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(item => item.name.toLowerCase().trim().includes(keyword) || item.category.toLowerCase().trim().includes(keyword))
  res.render('index', {restaurants: restaurants, keyword: keyword})
})

app.post('/restaurant/:restaurant_id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The restaurant list project is running on the http:localhost:${port}.`)
})