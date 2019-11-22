const Seller = require("../models/Sellerdb.js");
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
  Seller.deleteOne(
    {
      emailId: req.session.data[0].emailId
    },
    function(error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to delete",
          error: error
        });
      }
      JSAlert.alert("Account deleted succesfully!!");
      res.redirect("/");
    }
  );
};
SellerController.update = function(req, res) {
  var data = { emailId: req.session.data[0].emailId };
  if (req.body.sellerName) {
    data.sellerName = req.body.sellerName;
  }
  if (req.body.contactNumber) {
    data.contactNumber = req.body.contactNumber;
  }
  if (req.body.companyName) {
    data.companyName = req.body.companyName;
  }
  if (req.body.password) {
    data.password = req.body.password;
  }

  Seller.updateOne(
    {
      emailId: req.session.data[0].emailId
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

      res.redirect("seller-login");
    }
  );
};
SellerController.signin = function(req, res) {
  var data = req.body;
  var collection;
  Seller.find({ emailId: data.email }, function(err, data) {
    collection = data;

    return data;
  });

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
      req.session.data = collection;
      res.redirect("seller-profile");
    }
  );
};
module.exports = SellerController;
