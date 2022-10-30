# My Restaurant List
Here lists the specific restaurants and some information about these restaurants.
## Features
- Check the specific restaurants with the rating.
- Check the detail information about the restaurants. 
- Search function for these restaurants about the name and category.
- Connect to the google map with the restaurant's location.
- 10/11: Add create, edit, delete restaurants functions.
- 10/13: Add sorting function & change the layout of create button and searchbar.
- 10/30: Add login/logout process and establish the restaurant list connection with logi users.
## Get Started
1. Install the Node.js and npm.
2. Clone this project to local.
3. Setting the .env file for environment variables. Please follow the .env.example file to create a .env file and change the FACEBOOK_ID and FACEBOOK_SECRET.
  ```
    FACEBOOK_ID=SKIP
    FACEBOOK_SECRET=SKIP
    FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
    SESSION_SECRET=ThisIsMySecret
    MONGODB_URI=mongodb://localhost/restaurant-list
    PORT=3000
  ```
4. Create the seed users' data.
  ```
    npm run seed
  ```
5. Start to run the project.
  ```
    npm run start
  ```
6. It will be runninng successfully if the message shows below.
  ```
    The restaurant list project is running on the http:localhost:3000.
  ```
7. Stop the process.
  ```
    CTRL + C
  ```
## Utilities
- Express 4.16.4
- Express-Handlebars 3.0.0
- BootStrap 4.3.1
- bcrypt 2.4.3
- connect-flash 0.1.1
- dotenv 16.0.3
- passport 0.4.1
- passport-local 1.0.0
- passport-facebook 3.0.0