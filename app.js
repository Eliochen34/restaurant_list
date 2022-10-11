const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const methodOverride = require("method-override")

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI2, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

app.use(express.static('public'))
app.use(methodOverride("_method"))

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
})

// 新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})


// 檢視單一餐廳
app.get('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 關鍵字搜索餐廳
app.get('/search', (req, res) => {
  if(!req.query.keyword) {
    res.redirect('/')
  }
  const keyword = req.query.keyword
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(
        restaurant => restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.includes(keyword)
      )
      res.render('index', {restaurants: filteredRestaurants, keyword })
    })
})

// 新增餐廳功能
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 編輯餐廳功頁面
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// 更新餐廳功能
app.put('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.restaurant_id, req.body)
    .then(() => res.redirect(`/restaurants/${req.params.restaurant_id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳功能
app.delete('/restaurants/:restaurant_id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.restaurant_id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`The restaurant list project is running on the http:localhost:${port}.`)
})