const Controller = {};

var Users = require('./../models/Users-db');
const Product = require('../models/Products');

// SignIn
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
            return res.redirect('/user-login')
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
}

// SignUp
Controller.user_signin = function (req, res) {
    var data = req.body;
    console.log(data);
    Users.register.findOne({
        $and: [
            { email: data.email }, { password: data.password }]
    }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(400).send("No user found");
        }

        return res.redirect('/');;
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
    console.log(data);
    Users.register.updateOne({ username: data.username }, { $set: data }, { multi: true, new: true }, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            console.log(user)
            return res.status(400).send("No user found");
        }

        return res.status(200).send(user);
    })
}

Product.cart = function (req, res) {
    var id = req.body.productid;
    console.log(req.body);
    Product.findOne({productName: id})
        .exec()
        .then(doc => {
            if (doc) {
                return res.render('cartpage', {
                    title: "product_display",
                    href: '../public/style.css',
                    productId: doc._id,
                    productName: doc.productName,
                    productPrice: doc.productPrice,
                    productImage: doc.productImage,
                    productImage1: doc.productImage1,
                    productImage2: doc.productImage2,
                    productHighlights: doc.productHighlights,
                    productHighlights1: doc.productHighlights1,
                    productHighlights2: doc.productHighlights2,
                    productHighlights3: doc.productHighlights3,
                    userReview: doc.userReview
                });
            } else {
                 return res.status(500).json({
                    message: 'No valid entry Found for provided Id'
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Error: err });
        })
}



module.exports = {
    Controller: Controller,
    Product :Product
}