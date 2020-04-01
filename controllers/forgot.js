var User = require("../models/Users-db");
const Seller = require("../models/Sellerdb.js");
const Controller = {};
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");

//-------------------------------------For User Forgot Password--------------------------------//
Controller.forgot = function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.register.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    return res.render('forgot', {
                        flag: false,
                    });;
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'eagle.ecommerce.app@gmail.com',
                    pass: 'fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'eagle.ecommerce.app@gmail.com',
                subject: 'Ecommerce Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');

                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        return res.render('forgot', {
            flag: true
        });
    });
};

Controller.verify = function (req, res) {
    console.log(req.params.token)
    User.register.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            return res.redirect('/forgot');
        }
        res.render('reset', { token: req.params.token });
    });
};
Controller.token = function (req, res) {
    console.log("reached")
    async.waterfall([
        function (done) {
            User.register.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {

                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.password = req.body.password

                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                        req.logIn(user, function (err) {
                            done(err, user);
                        });
                    });

                } else {

                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'eagle.ecommerce.app@gmail.com',
                    pass: 'fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'learntocodeinfo@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {

                done(err);
            });
        }
    ], function (err) {
        res.redirect('/user-login');
    });
};

//-------------------------------------For Seller Forgot Password--------------------------------//
Controller.forgot_seller = function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Seller.findOne({ emailId: req.body.email }, function (err, user) {
                if (!user) {
                    return res.render('forgot', {
                        flag: false,
                    });;
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'eagle.ecommerce.app@gmail.com',
                    pass: 'fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz'
                }
            });
            var mailOptions = {
                to: user.emailId,
                from: 'eagle.ecommerce.app@gmail.com',
                subject: 'Ecommerce Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset-seller/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');

                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        return res.render('forgot', {
            flag: true
        });
    });
};

Controller.verify_seller = function (req, res) {
    console.log(req.params.token)
    Seller.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            return res.redirect('/forgot');
        }
        res.render('reset', {
            token: req.params.token,
            flag: true
        });
    });
};
Controller.token_seller = function (req, res) {
    console.log("reached")
    async.waterfall([
        function (done) {
            Seller.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {

                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.password = req.body.password

                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function (err) {
                        req.logIn(user, function (err) {
                            done(err, user);
                        });
                    });

                } else {

                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'eagle.ecommerce.app@gmail.com',
                    pass: 'fKnyKSjgjSPHRkFkdMd!5xDka9cxbxna7Grvv6H7F$t*YY!UCz'
                }
            });
            var mailOptions = {
                to: user.emailId,
                from: 'learntocodeinfo@mail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.emailId + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {

                done(err);
            });
        }
    ], function (err) {
        res.redirect('/seller-login');
    });
};

module.exports = Controller;

