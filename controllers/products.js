const express = require("express");

const router = express.Router();

const Product = require('./../models/Products');

router.get('/', (req, res, next) => {
    var id = req.query.id;
    Product.findById(id)
        .exec()
        .then(doc => {
            var orignal_prize =Math.round(((parseFloat(doc.productPrice) * 20) / 100) + parseFloat(doc.productPrice));
            if (doc) {
                res.render('product_display', {
                    title: "product_display",
                    href: '../public/product_display.css',
                    css: 'homepage.css',
                    user: req.session.user,
                    seller: req.session.data,
                    product: doc,
                    mrp : orignal_prize
                });
            } else {
                res.status(500).json({
                    message: 'No valid entry Found for provided Id'
                })
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ Error: err });
        })
})

module.exports = router;