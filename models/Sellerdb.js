const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const SellerSchema = new mongoose.Schema(
  {
    sellerName: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    emailId: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default:
        "https://images.all-free-download.com/images/graphiclarge/harry_potter_icon_6825007.jpg"
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
    ]
  },
  {
    collection: "seller"
  }
);
SellerSchema.plugin(uniqueValidator, { message: "is already taken." });

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
