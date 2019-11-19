const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 8086;
const db=require('./models/index.js');

app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static('public'));
const hbs = exphbs.create({
    extname: '.hbs'
    }
)
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
const controllers=require('./controllers/index.js');
app.post('/seller',controllers.SellerController.create);
app.delete('/seller',controllers.SellerController.delete);
app.post('/seller_signin',controllers.SellerController.signin);
 



var pageController = require('./controllers/e-commerce.js');

// Home route
//app.get('/', pageController.home)

// Product List
app.get('/', pageController.home)

// Product Content
app.get('/product_display', pageController.product_display)

// Order Page
app.get('/cart', pageController.cart)

// Login/Registration (User)
app.get('/user-login', pageController.user_login)

// Login/Registration (Seller)
app.get('/seller-login', pageController.seller_login)

// User Profile
app.get('/user-profile', pageController.user_profile)

 
app.get('/seller_profile', pageController.seller_profile)

// Order History
app.get('/order-history', pageController.order_history)

// Address From Page
app.get('/address-form', pageController.add_form)

// Product List Form Page
app.get('/product-list-form', pageController.product_form)

app.get('/product_registration', pageController.product_registration)
 
db.connect()
.then (function(){
	app.listen(PORT, function () {
    console.log("Started : ", PORT);
}).on('error', function (error) {
    console.log("Unable To Start App >>>",error);
});
})
.catch(function(error)
{
	console.log("Failed to connect with database");
}) 


 