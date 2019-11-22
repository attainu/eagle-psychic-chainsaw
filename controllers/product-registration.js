const express = require('express');

const router = express.Router();

const Product = require('./../models/Products');
// product registration routes
router.post('/', function (req, res, next) {
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage,
        productDescription: req.body.productDescription,
        productSerialNumber: req.body.productSerialNumber,
        productCategory: req.body.productCategory,
        productionDate: req.body.productionDate
    })
    product
        .save()
        .then(result => {
            if (result) {
                return res.status(200).json({
                    msg: true
                })
            }

        })
        .catch(err => {

            return res.status(500).json({
                msg: false
            })
        })
})
// product registration page render in html
router.get('/', (req, res, next) => {
    res.status(200).render('product_registration', {
        title: 'Product registration',
        href: "../../public/product_registration.css"
    });

})




router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "product deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                Error: err
            })
        })
})
module.exports = router;
