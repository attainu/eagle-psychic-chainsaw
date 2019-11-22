const mongoose = require("mongoose");
const seller = require("./Sellerdb.js");
function connect() {
  return mongoose.connect("mongodb://localhost:27017/sellerProfile", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
module.exports = {
  models: {
    seller: seller
  },
  connect: connect
};
