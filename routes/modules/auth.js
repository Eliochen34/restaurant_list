const express = require('express')
const passport = require('passport')
const router = express.Router()

// 使用者點擊facebook登入按鈕的路由
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// 在facebook驗證完成後回來的路由
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router