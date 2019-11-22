const mongoose = require("mongoose");
const seller = require("./Sellerdb.js");
 
module.exports = {
  models: {
    seller: seller
  },
  connect: connect
}
