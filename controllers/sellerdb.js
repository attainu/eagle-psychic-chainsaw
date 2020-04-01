const Seller = require("../models/Sellerdb.js");
const products = require("../models/Products.js");
const session = require("express-session");
var cookieParser = require("cookie-parser");
var Product = require("../models/Products.js");
const async = require("async");
const cloudinary = require("cloudinary");
const SellerController = {};
var msg;
cloudinary.config({
  cloud_name: "drr1rnoxf",
  api_key: "433145995998357",
  api_secret: "biV0xzLr1Gg6HzFgAz6aaQB3Tkk"
});
var imageResult = null;
SellerController.create = async function(req, res) {
  await cloudinary.v2.uploader.upload(req.file.path, function(error, res1) {
    console.log("error", error);
    imageResult = res1;
  });

  Seller.create(
    {
      sellerName: req.body.name,
      contactNumber: req.body.number,
      emailId: req.body.email,
      password: req.body.password,
      companyName: req.body.company,
      image: imageResult.secure_url
    },
    function(error, response) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to create",
          error: error
        });
      }
      res.redirect("/seller-login");
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
SellerController.find = function(req, res) {
  var email = req.body.email;

  Seller.find({ emailId: email }, function(err, data) {
    if (err || !data.length) {
      res.status(200).json({
        error: "Error"
      });
      return;
    }

    return res.status(500).json({
      success: "Success"
    });
  });
};
/*------------------add product in seller db-------------------*/
var flag;
SellerController.addProduct = async function(req, res) {
  await cloudinary.v2.uploader.upload(req.file.path, function(error, res1) {
    console.log("error", error);
    imageResult = res1;
  });
  const product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: imageResult.secure_url,
    productDescription: req.body.productDescription,
    productSerialNumber: req.body.productSerialNumber,
    productCategory: req.body.productCategory,
    productionDate: req.body.productionDate,
    productHighlights1: req.body.productHighlights1,
    productHighlights2: req.body.productHighlights2,
    productHighlights3: req.body.productHighlights3
  });
  product
    .save()
    .then(result => {
      Seller.updateOne(
        { emailId: req.session.data.emailId },
        { $push: { product: result._id } },
        { multi: true, new: true },
        function(err, user) {
          if (err) {
            console.log(err);
          }

          console.log(user);
        }
      );
      res.redirect("/seller-profile");
    })
    .catch(err => {
      return res.status(500).json({
        flag: false
      });
    });
};

/*----------Populate seller with product-------------------------*/
SellerController.getProduct = function(req, res) {
  Seller.findById(req.session.data._id)
    .populate("seller")
    .exec(function(err, docs) {
      var iter = function(user, callback) {
        Product.populate(
          user,
          {
            path: "product"
          },
          callback
        );
      };
      async.each(docs, iter, function done(err) {
        res(null, docs);
      });
    });
};
/*------------------to get product details-------------------------------*/
var result;
SellerController.get_Product = function(req, res) {
  var id = req.body.id;

  Product.findById(id, function(err, product) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(product);
    return res.render("product-modification", {
      title: "E-Commerce Website",
      css: "product-modification.css",
      product: product
    });
  });
};
/*---------------------to update product details-------------------------*/
SellerController.update_product = function(req, res) {
  var id = req.body.productId;
  var data = req.body;
  Product.findByIdAndUpdate(
    id,
    {
      $set: data
    },
    { multi: true, new: true },
    function(error, product) {
      if (error) {
        return res.send({
          status: false,
          message: "failed to update",
          error: error
        });
      }
      return res.status(200).redirect("/seller-profile");
    }
  );
};
/*------------------to delete product----------------------------*/
SellerController.deleteProduct = function(req, res) {
  var id = req.body.idDelete;
  var idSellerProduct = "req.session.data.product" + id;
  Seller.findByIdAndRemove(idSellerProduct, function(err, response) {});
  Product.findByIdAndRemove(id, function(err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(400).send("Wrong ID");
    }

    return res.status(200).redirect("/seller-profile");
  });
};

/*----------mail sending script--------------------------------*/
var nodemailer = require("nodemailer");
SellerController.sendMail = function(req, res) {
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "eagle.ecommerce.app@gmail.com",
      pass: "fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz"
    }
  });

  var mailOptions = {
    from: "learntocodeinfo@mail.com",
    to: "sitanshu4@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!"
  };

  smtpTransport.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = SellerController;
