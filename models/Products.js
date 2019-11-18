const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName :{type : String,required : true},
    productPrice : {type: String,required: true},
    productDescription :{type:String,required:true},
    productImage :{type:String,required:true},
    productImage1 :{type:String,required:true},
    productImage2 :{type:String,required:true},
    productHighlights :{type:String},
    productHighlights1 :{type:String},
    productHighlights2 :{type:String},
    productHighlights3 :{type:String},
    userReview : {type:String}
}) 

module.exports = mongoose.model('Product',productSchema);