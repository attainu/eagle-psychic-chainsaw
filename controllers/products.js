const express = require("express");

const router = express.Router();

const Product = require('./../models/Products');

router.get('/:productId', (req, res, next) => {
    var id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.render('product_display', {
                    title: "product_display",
                    href: '../public/product_display.css',
                    productId: doc._id,
                    productName: doc.productName,
                    productPrice: doc.productPrice,
                    productImage: doc.productImage,
                    productImage1: doc.productImage1,
                    productImage2: doc.productImage2,
                    productHighlights: doc.productHighlights,
                    productHighlights1: doc.productHighlights1,
                    productHighlights2: doc.productHighlights2,
                    productHighlights3: doc.productHighlights3,
                    userReview: doc.userReview
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
