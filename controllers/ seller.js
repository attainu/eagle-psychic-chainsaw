const Seller = require("./../models/Users.js");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const SellerController = {};
SellerController.create = function(req, res) {
  var data = req.body;

  Seller.create(
    {
      sellerName: data.name,
      contactNumber: data.number,
      emailId: data.email,
      password: data.password,
      companyName: data.company
    },
    function(error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to create",
          error: error
        });
      }
      return res.render("seller-signin-signup", {
        title: "seller_profile",
        href: "../../public/seller-signin-signup.css"
      });
    }
  );
};
SellerController.delete = function(req, res) {
  var data = req.body;
  Seller.deleteOne(
    {
      sellerName: data.sellerName
    },
    function(error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to delete",
          error: error
        });
      }
      return res.send({
        status: true,
        message: "Deleted Successfully!!!!",
        data: data
      });
    }
  );
};
SellerController.update = function(req, res) {
  var data = req.body;
  Seller.updateOne(
    {
      sellerName: data.sellerName
    },
    {
      $set: data
    },
    { multi: true, new: true },
    function(error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to update",
          error: error
        });
      }
      if (!response) {
        return res.send({
          status: false,
          message: "user not found"
        });
      }

      return res.send({
        status: true,
        message: "updated Successfully!!!!",
        data: data
      });
    }
  );
};
SellerController.signin = function(req, res) {
  var data = req.body;
  console.log(data);

  Seller.findOne(
    {
      $and: [{ emailId: data.email }, { password: data.password }]
    },
    function(err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.render("seller-signin-signup", {
          title: "seller_profile",
          href: "../../public/seller-signin-signup.css"
        });
      }

      req.session.loggedin = true;
      req.session.email = data.email;
      res.redirect("seller_profile");
    }
  );
};
module.exports = SellerController;
