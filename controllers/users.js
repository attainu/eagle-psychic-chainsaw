const Controller = {};
const async = require("async");
const cloudinary = require("cloudinary");
var Users = require("../models/Users-db");
var Product = require("../models/Products.js");

//------------------------------------------------------User Image------------------------------------------------------//
cloudinary.config({
    cloud_name: "salmanahmed",
    api_key: "128317469375351",
    api_secret: "mRpKkK9ljiCjEdbKp9TAcc3d93o"
});
var imageResult;
Controller.user_image = async function (req, res) {
    await cloudinary.v2.uploader.upload(req.file.path, function (error, res1) {
        console.log("error", error);
        imageResult = res1;
    });
    var id = req.session.user._id;
    var data = imageResult.secure_url;
    Users.register.findByIdAndUpdate(
        id,
        { $set: { image: data } },
        { multi: true, new: true },
        function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(400).send("No user found");
            }
            req.session.save(function (err) {
                req.session.user = user;
            });
            setTimeout(function () {
                return res.status(200).redirect("/user-profile");
            }, 500);
        }
    );
};

//---------------------------------------------------------SignUp---------------------------------------------------------//
Controller.user_signup = function (req, res) {
    const users = new Users.register({
        username: req.body.name,
        email: req.body.email,
        mobile_number: req.body.number,
        password: req.body.password,
        address: req.body.address //here you have to give the address id number in string
    });
    users
        .save()
        .then(result => {
            if (result) {
                return res.status(200).json({
                    msg: true
                });
            }
        })
        .catch(err => {
            return res.status(500).json({
                msg: false
            });
        });
};

//---------------------------------------------------------SignIn---------------------------------------------------------//
var flag = null;
Controller.user_signin = function (req, res) {
    var data = req.body;
    Users.register.findOne(
        {
            $and: [{ email: data.email }, { password: data.password }]
        },
        function (err, user) {
            if (err) {
                console.log(err);
            }
            if (!user) {
                flag = false;
            } else {
                req.session.user = user;
                flag = true;
            }
            res.json({
                flag: flag
            });
        }
    );
};

// ---------------------------------------------------------Delete User---------------------------------------------------------//
Controller.user_delete = function (req, res) {
    var data = req.session.user;
    Users.register.findByIdAndRemove(data._id, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {

            return res.status(400).send("No user found");
        }
        req.session.destroy(function (err) {
            res.clearCookie("user-login");
            setTimeout(function () { res.redirect('/'); }, 1500)
        });

    })
}

//-----------------------------------------------------Update User------------------------------------------------------//
Controller.user_update = function (req, res) {
    var id = req.session.user._id;
    var data = req.body;
    Users.register.findByIdAndUpdate(
        id,
        { $set: data },
        { multi: true, new: true },
        function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(400).send("No user found");
            }
            req.session.save(function (err) {
                req.session.user = user;
            });
            setTimeout(function () {
                return res.status(200).redirect("/user-profile");
            }, 500);
        }
    );
};

//------------------------------------------------Get User Data with Cart---------------------------------------------------//
Controller.cart_get = function (req, res) {
    var user = req.session.user;
    Users.register
        .findById(user._id)
        .populate("users")
        .exec(function (err, docs) {
            var iter = function (user, callback) {
                Product.populate(
                    user,
                    {
                        path: "cart"
                    },
                    callback
                );
            };

            async.each(docs, iter, function done(err) {
                res(null, docs);
            });
        });
};

//------------------------------------------------Get User Data with Order History---------------------------------------------------//
Controller.order_get = function (req, res) {
    var user = req.session.user;
    Users.register
        .findById(user._id)
        .populate("users")
        .exec(function (err, docs) {
            var iter = function (user, callback) {
                Product.populate(
                    user,
                    {
                        path: "order_history"
                    },
                    callback
                );
            };

            async.each(docs, iter, function done(err) {
                res(null, docs);
            });
        });
};

//---------------------------------------------------Add Product in User Cart DB------------------------------------------------------//
Controller.cart = function (req, res) {
    var id = req.session.user._id;
    var data = req.body.id;
    var flag = null;
    req.session.user.cart.forEach(function (product) {
        if (product == data) {
            flag = true;
        }
    });
    if (flag == true) {
        return res.status(200).redirect("back");
    }
    Users.register.findByIdAndUpdate(
        id,
        { $addToSet: { cart: data } },
        { multi: true, new: true },
        function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(400).send("No user found");
            }
            req.session.save(function (err) {
                req.session.user = user;
            });

            if (req.body.cart) return res.status(200).redirect("/cart");
            return res.status(200).redirect("back");
        }
    );
};

//---------------------------------------------------Add Product in User Order_History DB------------------------------------------------------//
Controller.order = function (req, res) {
    var id = req.session.user._id;
    req.session.user.cart.forEach(function (product) {
        Users.register.findByIdAndUpdate(
            id,
            { $push: { order_history: product } },
            { multi: true, new: true },
            function (err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!user) {
                    return res.status(400).send("No user found");
                }
                Users.register.findByIdAndUpdate(
                    id,
                    { $pull: { cart: { $in: [product] } } },
                    function (err, user) {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        if (!user) {
                            return res.status(400).send("Wrong ID");
                        }
                        Users.register.findByIdAndUpdate(id, { $pull: { cart: { $in: [product] } } }, function (err, user) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            if (!user) {
                                return res.status(400).send("Wrong ID");
                            }
                        })
                        req.session.save(function (err) {
                            req.session.reload(function (err) { req.session.user = user; })

                        })
                    })
            })
        setTimeout(function () { return res.status(200).redirect('/cart') }, 1500);



    })
}


//---------------------------------------------------------Delete Cart Product------------------------------------------------------//
Controller.cart_delete = function (req, res) {
    var cart_id = req.query.id;
    var id = req.session.user._id;
    Users.register.findByIdAndUpdate(
        id,
        { $pull: { cart: { $in: [cart_id] } } },
        function (err, user) {
            req.session.save(function (err) {
                req.session.user = user;
            });
            setTimeout(function () {
                return res.status(200).redirect("/cart");
            }, 500);
        }
    );
};

//---------------------------------------------------------Logout route---------------------------------------------------------//
Controller.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.clearCookie("user-login");
        return res.status(200).redirect("/");
    });
};

//--------------------------------------------------Authentication middleware-------------------------------------------------//
Controller.validate = function (req, res, next) {
    Users.verify(req, function (error, info) {
        if (error) {
            return next();
        }
        return res.status(200).redirect("/user-login");
    });
};

//-------------------------------------------------Get User Data with Address------------------------------------------------//
Controller.address_get = function (req, res) {
    var user = req.session.user;
    Users.register
        .findById(user._id)
        .populate("users")
        .exec(function (err, docs) {
            var iter = function (user, callback) {
                Users.address.populate(
                    user,
                    {
                        path: "address"
                    },
                    callback
                );
            };

            async.each(docs, iter, function done(err) {
                res(null, docs);
            });
        });
};

//---------------------------------------------------------Get Address---------------------------------------------------------//
Controller.add_get = function (req, res) {
    var id = req.body.id;
    Users.address.findById(id, function (err, address) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!address) {
            return res.status(400).send("Not Found");
        }
        return res.render("address", {
            title: "E-Commerce Website",
            css: "address.css",
            address: address,
            flag: true
        });
    });
};

//------------------------------------------------------Update Address------------------------------------------------------//
Controller.address_update = function (req, res) {
    var id = req.body.id;
    Users.address.findByIdAndUpdate(
        id,
        { $set: req.body },
        { multi: true, new: true },
        function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                return res.status(400).send("Wrong ID");
            }

            return res.status(200).redirect("/user-profile");
        }
    );
};

//---------------------------------------------------------Delete Address------------------------------------------------------//
Controller.address_delete = function (req, res) {
    var id = req.body.value;
    Users.address.findByIdAndRemove(id, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(400).send("Wrong ID");
        }
        Users.register.findByIdAndUpdate(
            id,
            { $pull: { address: { $in: [id] } } },
            function (err, user) {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!user) {
                    return res.status(400).send("Wrong ID");
                }
            }
        );

        return res.status(200).redirect("/user-profile");
    });
};

//-------------------------------------------------------Add Address-------------------------------------------------------//
Controller.address_add = function (req, res) {
    const address = new Users.address({
        name: req.body.name,
        number: req.body.number,
        temp_number: req.body.temp_number,
        user_address: req.body.user_address,
        pincode: req.body.pincode,
        locality: req.body.locality,
        city: req.body.city,
        state: req.body.state,
        landmark: req.body.landmark,
        add_type: req.body.add_type
    });
    address
        .save()
        .then(result => {
            Users.register.updateOne(
                { username: req.session.user.username },
                { $push: { address: result._id } },
                { multi: true, new: true },
                function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    if (!user) {
                        console.log("No user found");
                    }
                }
            );
            return res.status(200).redirect("/user-profile");
        })
        .catch(err => {
            return res.status(500).json({
                msg: err
            });
        });
};

module.exports = {
    Controller: Controller,
    Product: Product
};
