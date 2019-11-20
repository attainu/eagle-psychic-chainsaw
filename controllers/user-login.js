const Controller = {};
const async = require('async');
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
    Users.register.updateOne({ password: data.password }, { $set: data }, { multi: true, new: true }, function (err, user) {
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
            return next();
        }
        return res.redirect('/user-login');
    });
}


// get user data Address
Controller.address_get = function (req, res) {
    var user = req.session.user;
    Users.register.findOne({
        username: user.username
    })
        .populate('users')
        .exec(function (err, docs) {
            var i = 0;
            console.log("docs>>>", docs)
            var iter = function (user, callback) {
                console.log("user>>>", user, ++i)
                Users.address.populate(user, {
                    path: 'address'
                },
                    callback);
            };

            async.each(docs, iter, function done(err) {

                res.send({
                    1: docs,
                    i: i
                });
            });
        });
}

// Add Address
Controller.address_add = function (req, res) {
    const address = new Users.address({
        name: req.body.name,
        number: req.body.number,
        temp_number: req.body.temp_number,
        user_address: req.body.user_address,
        pincode: req.body.pincode,
        locality: req.body.locality,
        city: req.body.city,
        state: req.body.state,
        landmark: req.body.landmark,
        add_type: req.body.add_type,
    })
    address
        .save()
        .then(result => {
            console.log("1")

            console.log(req.session.user.password)
            Users.register.updateOne({ username: req.session.user.username },
                { $push: { address: result._id } },
                { multi: true, new: true },
                function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    if (!user) {
                        console.log("No user found");
                    }

                    console.log(user);
                })
            return res.status(200).json({
                msg: result,
                id: result._id
            })
        })
        .catch(err => {
            return res.status(500).json({
                msg: err
            })
        })
}



module.exports = {
    Controller: Controller,
    Product: Product
}