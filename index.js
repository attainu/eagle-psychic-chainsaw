const fs = require("fs");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");
const PORT = process.env.PORT || 9091;
const HOST = "0.0.0.0";
var passport = require("passport");

var cookieParser = require("cookie-parser");
var upload = require("./controllers/multer.js");
require("dotenv").config();

// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    inc: function(value, option) {
      return parseInt(value) + 1;
    }
  }
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://eagle-ecommerce-app:eagle-ecommerce-app@ecommerce-app-ll9yl.mongodb.net/ecommerce-app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

//session configuration
app.use(
  session({
    name: "user-login",
    secret: "ndnjsnvnskkvm#@R$",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3000000, // 30 minute
      path: "/",
      sameSite: true,
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*------for seller-----------------*/
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(
//   session({
//     resave: false,
//     saveUnintialized: true,
//     secret: "sitanshu123",
//     cookie: {
//       httpOnly: true,
//       maxAge: 1200000,
//       path: "/",
//       sameSite: true,
//       secure: false
//     }
//   })
// );

var authRoute = require("./controllers/authentication.js");
app.use("/public", express.static("public"));

let db = mongoose.connection;

// check DB connection
db.once("open", function() {
  console.log("connected to mongodb");
});

//check for DB errors
db.on("error", function(err) {
  console.log(err);
});

//Controller link here
var pageController = require("./controllers/e-commerce.js");
var user = require("./controllers/users.js");
const productRouter = require("./controllers/products");
const categoryRouter = require("./controllers/product-category");
const product_registration = require("./controllers/product-registration"); // product registration controller
const product_listRouter = require("./controllers/product-list"); // product list controller

// Validation Middleware
app.use(user.Controller.validate);

// It'll prevent to use home route by back button when user logout
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

/*----------------Seller database route----------*/
app.set("view engine", ".hbs");
const controllers = require("./controllers/sellerdb");
app.post("/seller", upload.single("image"), controllers.create);
app.post("/seller-delete", controllers.delete);
app.post("/seller_signin", controllers.signin);
app.post("/seller_update", controllers.update);
// app.post("/seller-product", controllers.addProduct);
app.post("/seller-product", upload.single("image"), controllers.addProduct);
app.get("/seller-getProduct", controllers.getProduct);
app.post("/seller-logout", authRoute.logout);
app.post("/seller_find", controllers.find);
app.post("/seller_mail", controllers.sendMail);
app.post("/product-modification", controllers.get_Product);
app.post("/product-modify", controllers.update_product);
app.post("/product-delete", controllers.deleteProduct);
var pageController = require("./controllers/e-commerce.js");

// product registration
app.use("/product_registration", product_registration);

// product list
app.use("/product_list", product_listRouter);

// product category
app.use("/product-category", categoryRouter);

// Home route
app.get("/", pageController.home);

// Product Content
app.use("/products", productRouter);

/*------seller routes----------------*/
// Login/Registration (Seller)
app.get("/seller-login", pageController.seller_login);
app.get("/seller-profile", pageController.seller_profile);
app.get("/seller-profile-update", pageController.seller_profile_modification);
/*----------route for email verification--------------------*/

app.post("/send_mail", pageController.seller_login);
app.get("/verify_mail", pageController.seller_login);
// Order Page
app.get("/cart", pageController.cart);
app.post("/cart", user.Controller.cart);

// Login/Registration (User)
app.get("/user-login", pageController.user_login);
app.post("/user-signin", user.Controller.user_signin);
app.post("/user-signup", user.Controller.user_signup);
app.post("/user-delete", user.Controller.user_delete);
app.get("/user-update-form", pageController.user_profile_edit);
app.post("/user-update", user.Controller.user_update); //working here
app.get("/user-logout", user.Controller.logout);
app.post("/user-add", user.Controller.add_get);
app.post("/user-address", user.Controller.address_add);
// app.get('/user-address-get', user.Controller.address_get)
app.post("/user-address-update", user.Controller.address_update);
app.post("/user-address-delete", user.Controller.address_delete);
app.get("/cart-delete", user.Controller.cart_delete);
app.get("/order-history", pageController.order_history);
app.get("/order", user.Controller.order);
app.post(
  "/user-image",
  upload.single("user-image"),
  user.Controller.user_image
);

// User Profile
app.get("/user-profile", pageController.user_profile);

// Order History
// app.get("/order-history", pageController.order_history);

// Address From Page
app.get("/address-form", pageController.add_form);

// Product List Form Page
//app.get('/product-list-form', pageController.product_form)

app.get("/product_registration", pageController.product_registration);

// forgot password

var forgot = require("./controllers/forgot");

app.get("/forgot", function(req, res) {
  res.render("forgot", {});
});

app.post("/forgot", forgot.forgot);

app.get("/reset/:token", forgot.verify);

app.post("/reset/:token", forgot.token);

app.post("/forgot-seller", forgot.forgot_seller);

app.get("/reset-seller/:token", forgot.verify_seller);

app.post("/reset-seller/:token", forgot.token_seller);
/*------------------------------capthca code-----------------------*/
app.post("/subscribe", async (req, res) => {
  if (!req.body.captcha)
    return res.json({ success: false, msg: "Please select captcha" });

  // Secret key
  const secretKey = "6LcpXcUUAAAAABi6OcRsG4mpS3ylTlxk3sQl1ibr";

  // Verify URL
  const query = stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  // Make a request to verifyURL
  const body = await fetch(verifyURL).then(res => res.json());

  // If not successful
  if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: "Failed captcha verification" });

  // If successful
  return res.json({ success: true, msg: "Captcha passed" });
});

//Port
app
  .listen(PORT, HOST, function() {
    console.log("Started : ", PORT);
  })
  .on("error", function(err) {
    console.log("Unable To Start App >>>", err);
  });
