const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName :{type : String,required : true},
    productPrice : {type: String,required: true},
    productDescription :{type:String,required:true},
    productImage :{type:String,required:true},
    productSerialNumber: {type:Number,required:true},
    productCategory: {type:String,required:true},
    productionDate: {type:Date,required:true},
    productHighlights1 :{type:String},
    productHighlights2 :{type:String},
    productHighlights3 :{type:String},
    userReview : {type:String}
}) 

module.exports = mongoose.model('Product',productSchema,'product');