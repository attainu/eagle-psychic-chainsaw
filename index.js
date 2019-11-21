const fs = require('fs');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        inc: function (value, option) {
            return parseInt(value) + 1;
        },
    }
})
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://eagle-ecommerce-app:eagle-ecommerce-app@ecommerce-app-ll9yl.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false

    })

//session configuration
app.use(session({
    name: 'user-login',
    secret: 'ndnjsnvnskkvm#@R$',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 600000, // 30 minute
        path: '/',
        sameSite: true,
        secure: false
    }
}))

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
var user = require('./controllers/users.js');
const productRouter = require('./controllers/products');

// product registration controller
const product_registration = require('./controllers/product-registration');

// product registration
app.use('/product_registration', product_registration);


// product list controller
const product_listRouter = require('./controllers/product-list');

// product list
app.use('/product_list', product_listRouter);


// Validation Middleware
app.use(user.Controller.validate);

// Home route
app.get('/', pageController.home)


// // Product List
// app.get('/product-list', pageController.list)

// Product Content
app.use('/products', productRouter)



// Order Page
app.get('/cart', pageController.cart)
app.post('/cart', user.Product.cart)

// Login/Registration (User)
app.get('/user-login', pageController.user_login)
app.post('/user-signin', user.Controller.user_signin)
app.post('/user-signup', user.Controller.user_signup)
app.post('/user-delete', user.Controller.user_delete)
app.get('/user-update-form', pageController.user_profile_edit)
app.post('/user-update', user.Controller.user_update) //working here
app.get('/user-logout', user.Controller.logout)
app.post('/user-add', user.Controller.add_get)
app.post('/user-address', user.Controller.address_add)
// app.get('/user-address-get', user.Controller.address_get)
app.post('/user-address-update', user.Controller.address_update)
app.post('/user-address-delete', user.Controller.address_delete)

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
app.listen(PORT, HOST, function () {
    console.log("Started : ", PORT);
}).on('error', function () {
    console.log("Unable To Start App >>>");

}) 