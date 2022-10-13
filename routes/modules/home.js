const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sorting = require('../../utility/sorting')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort(sorting(req.query.sort))
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 關鍵字搜索餐廳
router.get('/search', (req, res) => {
  if (!req.query.keyword) {
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
      res.render('index', { restaurants: filteredRestaurants, keyword })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router