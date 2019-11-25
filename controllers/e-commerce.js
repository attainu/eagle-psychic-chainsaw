const Controller = {};
const model = require("./../models/E-Commerce.js");
const user = require("./users");
const seller = require("./sellerdb.js");

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
    console.log("info>>>>", info);
    return res.render("cartpage", {
      title: "E-Commerce Website",
      css: "style.css",
      href: "../../public/homepage.css",
      product: info
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
  var random = null;
  model.order_history(random, function(error, info) {
    return res.render("product-order-history", {
      title: "E-Commerce Website",
      css: "product-order-history.css"
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

module.exports = Controller;
