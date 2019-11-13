const Controller = {};
const model = require('./../models/E-Commerce.js');

// Home route
Controller.home = function (req, res) {

    model.home(random, function (error, info) {
        var book = info;
        return res.render('homepage', {
            title: 'E-Commerce Website',
        });
    })
}

// Product List
Controller.list = function (req, res) {

    model.list(random, function (error, info) {
        var book = info;
        return res.render('listpage', {
            title: 'E-Commerce Website',
        });
    })
}

// Product Content
Controller.content = function (req, res) {

    model.content(random, function (error, info) {
        var book = info;
        return res.render('contentpage', {
            title: 'E-Commerce Website',
        });
    })
}

// Order Page
Controller.cart = function (req, res) {

    model.cart(random, function (error, info) {
        var book = info;
        return res.render('cartpage', {
            title: 'E-Commerce Website',
        });
    })
}

// Login/Registration (User)
Controller.user_login = function (req, res) {

    model.user_login(random, function (error, info) {
        var book = info;
        return res.render('user-login', {
            title: 'E-Commerce Website',
        });
    })
}

// Login/Registration (Seller)
Controller.seller_login = function (req, res) {

    model.seller_login(random, function (error, info) {
        var book = info;
        return res.render('seller-login', {
            title: 'E-Commerce Website',
        });
    })
}

// User Profile
Controller.user_profile = function (req, res) {

    model.user_profile(random, function (error, info) {
        var book = info;
        return res.render('user-profile', {
            title: 'E-Commerce Website',
        });
    })
}

// Seller Profile
Controller.seller_profile = function (req, res) {

    model.seller_profile(random, function (error, info) {
        var book = info;
        return res.render('seller-profile', {
            title: 'E-Commerce Website',
        });
    })
}

// Order History
Controller.order_history = function (req, res) {

    model.order_history(random, function (error, info) {
        var book = info;
        return res.render('order-history', {
            title: 'E-Commerce Website',
        });
    })
}



module.exports = Controller;