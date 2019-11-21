const Controller = {};
const model = require('./../models/E-Commerce.js');
const user = require('./users');

// Home route
Controller.home = function (req, res) {
    var random = null;
    model.home(random, function (error, info) {
        if (req.session.user) {
            return res.render('homepage', {
                title: 'E-Commerce Website',
                css: 'homepage.css',
                user: req.session.user
            });
        }
        else {
            return res.render('homepage', {
                title: 'E-Commerce Website',
                css: 'homepage.css'
            });
        }
    })
}

// Product List
Controller.list = function (req, res) {
    var random = null;
    model.list(random, function (error, info) {
        return res.render('listpage', {
            title: 'E-Commerce Website',
            css: 'style.css'
        });
    })
}

// Product Content
Controller.product_display = function (req, res) {
    var random = null;
    model.product_display(random, function (error, info) {
        return res.render('product_display', {
            title: 'E-Commerce Website',
            href: '../../public/product_display.css'
        });
    })
}

// Order Page
Controller.cart = function (req, res) {
    var random = null;
    model.cart(random, function (error, info) {
        return res.render('cartpage', {
            title: 'E-Commerce Website',
            css: 'style.css',
            href: '../../public/homepage.css',
            user: req.session.user
        });
    })
}

// Login/Registration (User)
Controller.user_login = function (req, res) {
    var random = null;
    model.user_login(random, function (error, info) {
        return res.render('user-signup-signin', {
            title: 'E-Commerce Website',
            css: 'signup-signin.css',
            href: '../../public/homepage.css',
        });
    })
}

// Login/Registration (Seller)
Controller.seller_login = function (req, res) {
    var random = null;
    model.seller_login(random, function (error, info) {
        return res.render('seller-signup-signin', {
            title: 'E-Commerce Website',
            css: 'signup-signin.css'
        });
    })
}

// User Profile
Controller.user_profile = function (req, res) {
    user.Controller.address_get(req, function (error, info) {
        return res.render('profile-page', {
            title: 'E-Commerce Website',
            css: 'profile-page.css',
            href: '../../public/homepage.css',
            user: info,
            flag: true
        });
    })
}

// User Edit Form
Controller.user_profile_edit = function (req, res) {

    return res.render('edit-profile-page', {
        title: 'E-Commerce Website',
        css: 'edit-profile-page.css',
        // href: '../../public/homepage.css',
        user: req.session.user,
    });
}

// Seller Profile
Controller.seller_profile = function (req, res) {
    var random = null;
    model.seller_profile(random, function (error, info) {
        return res.render('seller_profile', {
            title: 'seller_profile',
            href: '../../public/seller_profile.css'
        });
    })
}

// Order History
Controller.order_history = function (req, res) {
    var random = null;
    model.order_history(random, function (error, info) {
        return res.render('product-order-history', {
            title: 'E-Commerce Website',
            css: 'product-order-history.css'
        });
    })
}

// Address Form
Controller.add_form = function (req, res) {
    var random = null;
    model.add_form(random, function (error, info) {

        return res.render('address', {
            title: 'E-Commerce Website',
            css: 'address.css'
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
            href: "../../public/product_registration.css"
        });
    })
}

module.exports = Controller;
