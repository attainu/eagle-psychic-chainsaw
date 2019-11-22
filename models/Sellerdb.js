const mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const SellerSchema=new mongoose.Schema({
	sellerName:{
		type:String,
		required:true,
		unique:true
	},
	contactNumber:{
		type:String,
		required:true,
		unique:true
	},
	emailId:{
		type:String,
		required:true,
		unique:true

	},
	password:{
		type:String,
		required:true,
		 

	},
	companyName:{
		type:String,
		required:true,
		 

	}
	

},{
	collection:'seller'
});
SellerSchema.plugin(uniqueValidator, { message: 'is already taken.' });
 
const Seller=mongoose.model('Seller',SellerSchema);
module.exports=Seller;
