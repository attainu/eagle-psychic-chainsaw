var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var db = mongoose.model;
var Schema = mongoose.Schema;
const Users = {};
const url = 'mongodb://localhost:27017/ecommerce-app';
const express = require('express');
const app = express();


if ('development' == app.get('env')) {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}
// User Registration Schema
var usersSchema = new Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    mobile_number: { type: String, required: true },
    password: { type: String, required: true },
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'address'
    }]
}, { timestamps: true });

//Unique Username And Email
usersSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// User Address Schema
var userAddress = new Schema({
    name: { type: String, required: true },
    number: String,
    temp_number: String,
    address: { type: String, required: true },
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

module.exports = Users;