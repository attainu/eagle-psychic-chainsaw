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
                user: req.session.user,
                seller: req.session.data
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        })
})

router.get('/all', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            return res.render('product-category', {
                title: 'E-Commerce Website',
                css: 'style.css',
                href: '../../public/homepage.css',
                products: docs,
                category: "All Products",
                user: req.session.user,
                seller: req.session.data
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                Error: err
            })
        })
})

router.get('/search', (req, res) => {
    // console.log(req)
    // var search = req.query.searchText.charAt(0).toUpperCase() + req.query.searchText.slice(1);
    // var SEARCH = req.query.searchText.toUpperCase()
    // Product.find({
    //     $or: [
    //         { productCategory: search},
    //         { productDescription: search },
    //         { productName: search},
    //         { productCategory: SEARCH},
    //         { productDescription: SEARCH },
    //         { productName: SEARCH} ]
    // })
    //     .exec()
    //     .then(docs => {
    //         return res.render('product-category', {
    //             title: 'E-Commerce Website',
    //             css: 'style.css',
    //             href: '../../public/homepage.css',
    //             products: docs,
    //             category: search,
    //             user: req.session.user
    //         });

    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             Error: err
    //         })
    //     })
    console.log("hello")
    var search = req.query.searchText;
    var SEARCH = req.query.searchText.toUpperCase()
    Product.find({
        $or: [{ productCategory: new RegExp('^' + search + '.*', "i") },
        { productName: new RegExp('^' + search + '.*', "i") },
        { productDescription: new RegExp('^' + search + '.*', "i") },
        { productHighlights1: new RegExp('^' + search + '.*', "i") }]
    })
        .exec()
        .then(docs => {
            return res.render('product-category', {
                title: 'E-Commerce Website',
                css: 'style.css',
                href: '../../public/homepage.css',
                products: docs,
                category: "Result : " + SEARCH,
                user: req.session.user,
                seller: req.session.data
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