const Controller = {};
var Users = require("../models/Users-db"); //db path from User Schema


//---------------------------------------------------------SignUp(Crete)---------------------------------------------------------//
Controller.user_signup = function (req, res) {
    const users = new Users.register({
        username: req.body.name,
        email: req.body.email,
        mobile_number: req.body.number,
        password: req.body.password,
        address: req.body.address
    });
    users
        .save()
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        });
};

//---------------------------------------------------------SignIn(Get)---------------------------------------------------------//
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
            res.send(user);
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
        res.send(user)

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
            res.send(user)
        }
    );
};

module.exports = {
    Controller: Controller
};