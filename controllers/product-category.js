const express = require('express');

const router = express.Router();

const Product = require('../models/Products');
router.get('/', (req, res, next) => {
    Product.find({ "productCategory": req.query.id })
        .exec()
        .then(docs => {
            return res.render('product-category', {
                title: 'E-Commerce Website',
                css: 'style.css',
                href: '../../public/homepage.css',
                products: docs,
                category: req.query.id,
                user: req.session.user
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        })
})

module.exports = router;