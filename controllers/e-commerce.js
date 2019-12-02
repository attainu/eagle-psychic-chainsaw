const Controller = {};
const model = require("./../models/E-Commerce.js");
const Seller = require("../models/Sellerdb.js");
const user = require("./users");
const seller = require("./sellerdb.js");
var nodemailer = require("nodemailer");

// Home route
Controller.home = function(req, res) {
  var random = null;
  model.home(random, function(error, info) {
    if (req.session.user || req.session.data) {
      return res.render("homepage", {
        title: "E-Commerce Website",
        css: "homepage.css",
        user: req.session.user,
        seller: req.session.data
      });
    } else {
      return res.render("homepage", {
        title: "E-Commerce Website",
        css: "homepage.css"
      });
    }
  });
};

// Product List
Controller.list = function(req, res) {
  var random = null;
  model.list(random, function(error, info) {
    return res.render("listpage", {
      title: "E-Commerce Website",
      css: "style.css"
    });
  });
};

// Product Content
Controller.product_display = function(req, res) {
  var random = null;
  model.product_display(random, function(error, info) {
    return res.render("product_display", {
      title: "E-Commerce Website",
      href: "../../public/product_display.css"
    });
  });
};

// Order Page
Controller.cart = function(req, res) {
  user.Controller.cart_get(req, function(error, info) {
    var sum = 0;
    var cursor = info.cart;

    cursor.forEach(function(doc) {
      sum = sum + parseFloat(doc.productPrice);
      return sum;
    });

    return res.render("cartpage", {
      title: "E-Commerce Website",
      css: "style.css",
      href: "../../public/homepage.css",
      user: req.session.user,
      product: info,
      total: sum
    });
  });
};

// Login/Registration (User)
Controller.user_login = function(req, res) {
  var random = null;
  model.user_login(random, function(error, info) {
    return res.render("user-signup-signin", {
      title: "E-Commerce Website",
      css: "signup-signin.css",
      href: "../../public/homepage.css"
    });
  });
};

// Login/Registration (Seller)
Controller.seller_login = function(req, res) {
  var random = null;
  model.seller_login(random, function(error, info) {
    return res.render("seller-signin-signup", {
      title: "E-Commerce Website",
      css: "seller-signin-signup.css"
    });
  });
};

// User Profile
Controller.user_profile = function(req, res) {
  user.Controller.address_get(req, function(error, info) {
    return res.render("profile-page", {
      title: "E-Commerce Website",
      css: "profile-page.css",
      href: "../../public/homepage.css",
      user: info,
      flag: true
    });
  });
};

// User Edit Form
Controller.user_profile_edit = function(req, res) {
  return res.render("edit-profile-page", {
    title: "E-Commerce Website",
    css: "edit-profile-page.css",
    // href: '../../public/homepage.css',
    user: req.session.user
  });
};

// Seller Profile
Controller.seller_profile = function(req, res) {
  if (req.session.data) {
    var random = null;
    seller.getProduct(req, function(error, info) {
      return res.render("seller_profile", {
        title: "seller_profile",
        css: "seller_profile.css",
        href: "../../public/homepage.css",
        collection: info
      });
    });
  } else {
    res.redirect("/seller-login");
  }
};

Controller.seller_profile_modification = function(req, res) {
  var random = null;
  if (req.session.loggedin) {
    model.seller_profile_modification(random, function(error, info) {
      return res.render("seller-modification", {
        title: "seller profile",
        href: "../../public/seller-modification.css",
        collection: req.session.data
      });
    });
  }
};

// Order History
Controller.order_history = function(req, res) {
  user.Controller.order_get(req, function(error, info) {
    var sum = 0;
    var cursor = info.order_history;

    cursor.forEach(function(doc) {
      sum = sum + parseFloat(doc.productPrice);
      return sum;
    });

    return res.render("order-history", {
      title: "E-Commerce Website",
      css: "style.css",
      css1: "profile-page.css",
      href: "../../public/homepage.css",
      user: req.session.user,
      product: info,
      total: sum
    });
  });
};

// Address Form
Controller.add_form = function(req, res) {
  var random = null;
  model.add_form(random, function(error, info) {
    return res.render("address", {
      title: "E-Commerce Website",
      css: "address.css"
    });
  });
};

// Product Form
Controller.product_form = function(req, res) {
  var random = null;
  model.product_form(random, function(error, info) {
    return res.render("product-list-form", {
      title: "E-Commerce Website"
    });
  });
};
// Product Registration Form
Controller.product_registration = function(req, res) {
  var random = null;
  model.product_form(random, function(error, info) {
    return res.render("product_registration", {
      title: "Product registration",
      href: "../../public/product_registration.css"
    });
  });
};
Controller.product_modification = function(req, res) {
  var random = null;
  model.product_modification(random, function(error, info) {
    return res.render("product-modification", {
      title: "Product modification",
      href: "../../public/product-modification.css"
    });
  });
};
/*---------------route for email verification----------------------*/

var rand, mailOptions, host, link;
Controller.send_mail = function(req, res) {
  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "eagle.ecommerce.app@gmail.com",
      pass: "S@7abcd123"
    }
  });
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  link = "http://" + req.get("host") + "/verify_mail?id=" + rand;

  mailOptions = {
    to: req.body.emailvalidation,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      Seller.findOneAndUpdate(
        { emailId: req.body.emailvalidation },
        { $set: { emailvalidate: undefined } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }

          console.log(doc);
        }
      );
      console.log("Message sent: " + response.message);
      res.render("emailsend");
    }
  });
};

Controller.verify_mail = function(req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");
      res.redirect("/seller-login");
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
};
/*-------------------------------------------------------------------------------------*/
module.exports = Controller;
