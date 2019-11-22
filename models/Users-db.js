var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var db = mongoose.model;
var Schema = mongoose.Schema;
const Users = {};
// const express = require('express');
// const app = express();


// if ('development' == app.get('env')) {
//     mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     });
// }
// User Registration Schema
var usersSchema = new Schema({
    username: { type: String, required: [true, "can't be blank"], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    mobile_number: { type: String, required: true },
    password: { type: String, required: true },
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'address'
    }],
    gender: String,
    dob: String,
    cart: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    order_history: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]

}, { timestamps: true });

//Unique Username And Email
usersSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// User Address Schema
var userAddress = new Schema({
    name: { type: String, required: true },
    number: String,
    temp_number: String,
    user_address: { type: String, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: String,
    add_type: { type: String, required: true },
})

//Model
Users.register = db('Users', usersSchema, 'users');
Users.address = db('Address', userAddress, 'address');

//middleware verification model
Users.verify = function (req, cb) {
    if (req.originalUrl === '/' ||
        req.originalUrl === '/product-list' ||
        req.originalUrl === '/products' ||
        req.originalUrl === '/user-login' ||
        req.originalUrl === '/user-signin' ||
        req.originalUrl === '/user-signup' ||
        req.originalUrl === '/user-logout' ||
        req.originalUrl === '/seller-login' ||
        req.originalUrl === '/product-list-form' ||
        req.originalUrl === '/product-display' ||
        req.originalUrl === '/seller_signin' ||
        req.originalUrl === '/seller_update' ||
        req.originalUrl === '/seller-delete' ||
        req.originalUrl === '/seller-logout' ||
        req.originalUrl === '/seller'
        ) {
        return cb(true);
    }

    if (typeof req.session.user === "undefined" &&  typeof req.session.data === "undefined") {
        return cb(null, {
            status: false,
            message: "First Login (Unauthorized)"
        })
    }
    else {
        return cb(true);
    }

}

module.exports = Users;