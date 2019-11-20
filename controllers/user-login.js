const Controller = {};

var Users = require('./../models/Users-db');
const Product = require('../models/Products');

// SignUp
Controller.user_signup = function (req, res) {
    const users = new Users.register({
        username: req.body.name,
        email: req.body.email,
        mobile_number: req.body.number,
        password: req.body.password,
        address: req.body.address                   //here you have to give the address id number in string
    })
    users
        .save()
        .then(result => {
            if (result) {
                return res.status(200).json({
                    msg: true
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                msg: false
            })
        })
}

// SignIn
var flag = null;
Controller.user_signin = function (req, res) {
    var data = req.body;
    Users.register.findOne({
        $and: [
            { email: data.email }, { password: data.password }]
    }, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            flag = false;;
        }
        else {
            req.session.user = user;
            flag = true;
        }
        res.json({
            flag: flag
        })
    })
}

// Delete User
Controller.user_delete = function (req, res) {
    var data = req.body;
    console.log(data);
    Users.register.findOneAndRemove({
        $and: [
            { email: data.email }, { password: data.password }]
    }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(400).send("No user found");
        }

        return res.status(200).send(user);
    })
}

// Update User
Controller.user_update = function (req, res) {
    var data = req.body;
    Users.register.updateOne({ username: data.username }, { $set: data }, { multi: true, new: true }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(400).send("No user found");
        }

        return res.status(200).send(user);
    })
}

// User Cart
Product.cart = function (req, res) {
    var id = req.body.productid;
    Product.findOne({ productName: id })
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc)
                return res.render('cartpage', {
                    title: "product_display",
                    href: '../public/style.css',
                    product: doc
                });
            } else {
                return res.status(500).json({
                    message: 'No valid entry Found for provided Id'
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                status: false
            })
        })
}

//logout route
Controller.logout = function (req, res) {

    req.session.destroy(function (err) {
        res.clearCookie("user-login");
        res.redirect('/');
    });
}

// Authentication middleware
Controller.validate = function (req, res, next) {

    Users.verify(req, function (error, info) {
        if (error) {
            console.log("again");
            return next();
        }
        return res.redirect('/user-login');
    });
}


module.exports = {
    Controller: Controller,
    Product: Product
}