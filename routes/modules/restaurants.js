const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳功能
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 檢視單一餐廳
router.get('/:restaurant_id', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 編輯餐廳功能頁面
router.get('/:restaurant_id/edit', (req, res) => {
  return Restaurant.findById(req.params.restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 更新餐廳功能
router.put('/:restaurant_id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.restaurant_id, req.body)
    .then(() => res.redirect(`/restaurants/${req.params.restaurant_id}`))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 刪除餐廳功能
router.delete('/:restaurant_id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.restaurant_id)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})


module.exports = router