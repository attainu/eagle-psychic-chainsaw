const fs = require('fs');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 8081;

// Configuration
app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static('public'));
const hbs = exphbs.create({
    extname: '.hbs'
})
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })

let db = mongoose.connection;

// check DB connection
db.once('open', function () {
    console.log('connected to mongodb');
})

//check for DB errors
db.on('error', function (err) {
    console.log(err);
}) 

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


var pageController = require('./controllers/e-commerce.js');
var user = require('./controllers/user-login.js');
const productRouter = require('./controllers/products');

// Home route
app.get('/', pageController.home)


// Product List
app.get('/product-list', pageController.list)

// Product Content
app.use('/products', productRouter)

// Order Page
app.get('/cart', pageController.cart)
app.post('/cart',user.Product.cart)

// Login/Registration (User)
app.get('/user-login', pageController.user_login)
app.post('/user-signin', user.Controller.user_signin)
app.post('/user-signup', user.Controller.user_signup)
app.delete('/user-delete', user.Controller.user_delete)
app.put('/user-update', user.Controller.user_update)

// Login/Registration (Seller)
app.get('/seller-login', pageController.seller_login)

// User Profile
app.get('/user-profile', pageController.user_profile)

// Seller Profile
app.get('/seller-profile', pageController.seller_profile)

// Order History
app.get('/order-history', pageController.order_history)

// Address From Page
app.get('/address-form', pageController.add_form)

// Product List Form Page
app.get('/product-list-form', pageController.product_form)
//
app.get('/product_registration', pageController.product_registration)




//Port
app.listen(PORT, function () {
    console.log("Started : ", PORT);
}).on('error', function () {
    console.log("Unable To Start App >>>");

}) 