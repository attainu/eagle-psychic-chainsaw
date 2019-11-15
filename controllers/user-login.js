const Controller = {};
var Users = require('./../models/Users-db');
const model = require('./../models/E-Commerce.js');

// Login/Registration (User)
Controller.user_login = function (req, res) {
    var random = null;
    model.user_login(random, function (error, info) {
        return res.render('user-signup-signin', {
            title: 'E-Commerce Website',
        });
    })
}

// SignIn
Controller.user_signin = function (req, res) {
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
            res.status(201).json({
                message: "User Added",
                createdUser: {
                    username: result.username,
                    email: result.email,
                    mobile_number: result.mobile_number,
                    password: result.password,
                    address: result.address
                }
            })
        })
        .catch(err => {
            res.status(500).json({ Error: err })
        })
}

// SignUp
Controller.user_signup = function (req, res) {
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

        return res.status(200).send(user);
    })
}

module.exports = Controller;