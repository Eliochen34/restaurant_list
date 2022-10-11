// const { connections } = require('mongoose')
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = mongoose.connection


mongoose.connect(process.env.MONGODB_URI2, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})



db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('running seeder')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})