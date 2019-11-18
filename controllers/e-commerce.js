const Controller = {};
const model = require('./../models/E-Commerce.js');

// Home route
Controller.home = function (req, res) {
    var random = null;
    model.home(random, function (error, info) {
        return res.render('homepage', {
            title: 'E-Commerce Website',
<<<<<<< HEAD
            css: 'homepage.css'
=======
>>>>>>> feature/profile_seller
        });
    })
}

// Product List
Controller.list = function (req, res) {
    var random = null;
    model.list(random, function (error, info) {
        return res.render('listpage', {
            title: 'E-Commerce Website',
<<<<<<< HEAD
            css: 'style.css'
=======
>>>>>>> feature/profile_seller
        });
    })
}

// Product Content
<<<<<<< HEAD
Controller.product_display = function (req, res) {
=======
Controller.product_display= function (req, res) {
>>>>>>> feature/profile_seller
    var random = null;
    model.product_display(random, function (error, info) {
        return res.render('product_display', {
            title: 'E-Commerce Website',
<<<<<<< HEAD
            href: '../../public/product_display.css'
=======
            href:'../../public/product_display.css'
>>>>>>> feature/profile_seller
        });
    })
}

// Order Page
Controller.cart = function (req, res) {
    var random = null;
    model.cart(random, function (error, info) {
        return res.render('cartpage', {
            title: 'E-Commerce Website',
<<<<<<< HEAD
            css: 'style.css'
=======
>>>>>>> feature/profile_seller
        });
    })
}

// Login/Registration (User)
Controller.user_login = function (req, res) {
    var random = null;
    model.user_login(random, function (error, info) {
<<<<<<< HEAD
        return res.render('user-signup-signin', {
            title: 'E-Commerce Website',
            css: 'signup-signin.css'
=======
        return res.render('user-login', {
            title: 'E-Commerce Website',
>>>>>>> feature/profile_seller
        });
    })
}

// Login/Registration (Seller)
Controller.seller_login = function (req, res) {
    var random = null;
    model.seller_login(random, function (error, info) {
<<<<<<< HEAD
        return res.render('seller-signup-signin', {
            title: 'E-Commerce Website',
            css: 'signup-signin.css'
=======
        return res.render('seller-login', {
           
>>>>>>> feature/profile_seller
        });
    })
}

// User Profile
Controller.user_profile = function (req, res) {
    var random = null;
    model.user_profile(random, function (error, info) {
        return res.render('user-profile', {
            title: 'E-Commerce Website',
        });
    })
}

// Seller Profile
Controller.seller_profile = function (req, res) {
    var random = null;
    model.seller_profile(random, function (error, info) {
        return res.render('seller_profile', {
             title: 'seller_profile',
             href:'../../public/seller_profile.css'
        });
    })
}

// Order History
Controller.order_history = function (req, res) {
    var random = null;
    model.order_history(random, function (error, info) {
        return res.render('order-history', {
            title: 'E-Commerce Website',
        });
    })
}

// Address Form
Controller.add_form = function (req, res) {
    var random = null;
    model.add_form(random, function (error, info) {
<<<<<<< HEAD
        return res.render('address', {
            title: 'E-Commerce Website',
            css: 'address.css'
=======
        return res.render('address-form', {
            title: 'E-Commerce Website',
>>>>>>> feature/profile_seller
        });
    })
}

// Product Form
Controller.product_form = function (req, res) {
    var random = null;
    model.product_form(random, function (error, info) {
        return res.render('product-list-form', {
            title: 'E-Commerce Website',
        });
    })
}
// Product Registration Form
Controller.product_registration = function (req, res) {
    var random = null;
    model.product_form(random, function (error, info) {
        return res.render('product_registration', {
            title: 'Product registration',
           href:"../../public/product_registration.css"
        });
    })
}

module.exports = Controller;