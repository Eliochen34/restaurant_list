// const { connections } = require('mongoose')
const { hash } = require('bcryptjs')
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json').results
const db = mongoose.connection
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI2, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})


// add seed users' data
const SEED_USERS = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    indexRestaurant: [0, 1, 2]
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    indexRestaurant: [3, 4, 5]
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('running seeder')
  // Promise.all確保其內容執行完畢後，才執行下一個.then
  Promise.all(
    SEED_USERS.map(user => {
      const { name, email, password, indexRestaurant} = user
      return User.create({
          name,
          email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        })
        .then(user => {
          const restaurants = indexRestaurant.map(index => {
            const restaurant = restaurantList[index]
            restaurant.userId = user._id
            return restaurant
          })
          return Restaurant.create(restaurants)
        })
    })
  )
  .then(() => {
    console.log("restaurantSeeder done!")
    process.exit()
  })
  .catch(err => console.log(err))
  .finally(() => db.close)
})