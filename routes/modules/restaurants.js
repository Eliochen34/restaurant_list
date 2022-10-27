const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增餐廳功能
router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({...req.body, userId})
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 檢視單一餐廳
router.get('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 編輯餐廳功能頁面
router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 更新餐廳功能
router.put('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findByIdAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${req.params.restaurant_id}`))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

// 刪除餐廳功能
router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})


module.exports = router