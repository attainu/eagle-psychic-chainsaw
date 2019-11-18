const Controller = {};
const model = require('./../models/E-Commerce.js');

// Home route
Controller.home = function (req, res) {
    var random = null;
    model.home(random, function (error, info) {
        return res.render('homepage', {
            title: 'E-Commerce Website',
            css: 'homepage.css'
        });
    })
}

// Product List
Controller.list = function (req, res) {
    var random = null;
    model.list(random, function (error, info) {
        return res.render('listpage', {
            title: 'E-Commerce Website',
        });
    })
}

// Product Content
Controller.content = function (req, res) {
    var random = null;
    model.content(random, function (error, info) {
        return res.render('contentpage', {
            title: 'E-Commerce Website',
        });
    })
}

// Order Page
Controller.cart = function (req, res) {
    var random = null;
    model.cart(random, function (error, info) {
        return res.render('cartpage', {
            title: 'E-Commerce Website',
        });
    })
}

// Login/Registration (User)
Controller.user_login = function (req, res) {
    var random = null;
    model.user_login(random, function (error, info) {
        return res.render('user-signup-signin', {
            title: 'E-Commerce Website',
            css: 'signup-signin.css'
        });
    })
}

// Login/Registration (Seller)
Controller.seller_login = function (req, res) {
    var random = null;
    model.seller_login(random, function (error, info) {
        return res.render('seller-login', {
            title: 'E-Commerce Website',
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
        return res.render('seller-profile', {
            title: 'E-Commerce Website',
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
        return res.render('address-form', {
            title: 'E-Commerce Website',
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

module.exports = Controller;