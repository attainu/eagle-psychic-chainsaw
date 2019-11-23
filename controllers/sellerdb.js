const Seller = require("../models/Sellerdb.js");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const SellerController = {};
var msg;

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
      return res.json({
        msg: true
      });
    }
  );
};
SellerController.delete = function(req, res) {
  Seller.deleteOne(
    {
      emailId: req.session.data.emailId
    },
    function(error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to delete",
          error: error
        });
      }

      req.session.destroy(function(err) {
        res.clearCookie("user-login");
        res.redirect("/");
      });
    }
  );
};
SellerController.update = function(req, res) {
  var data = req.body;

  Seller.findByIdAndUpdate(
    req.session.data._id,
    {
      $set: data
    },
    { multi: true, new: true },
    function(error, seller) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to update",
          error: error
        });
      }
      if (!seller) {
        return res.send({
          status: false,
          message: "user not found"
        });
      }
      console.log(seller);
      return req.session.save(function(err) {
        req.session.reload(function(err) {
          req.session.data = seller;
          res.status(200).redirect("/seller-profile");
        });
      });
    }
  );
};
var flag = null;
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
        flag = false;
      } else {
        req.session.loggedin = true;
        req.session.data = user;
        flag = true;
      }
      res.json({
        flag: flag
      });
    }
  );
};
module.exports = SellerController;
