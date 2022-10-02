const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


app.use(express.static('public'))

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