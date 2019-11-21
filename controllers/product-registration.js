const express = require('express');

const router = express.Router();

const Product = require('./../models/Products');
// product registration routes
router.post('/', function (req, res, next) {
    const product = new Product({
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productImage:req.body.productImage,
        productDescription: req.body.productDescription,
        productSerialNumber: req.body.productSerialNumber,
        productCategory: req.body.productCategory,
        productionDate: req.body.productionDate
    })
    product
        .save()
        .then(result => {
            res.redirect('/product_list')
            
        })
        .catch(err => {

            res.status(500).json({ Error: err });
        })
})
// product registration page render in html
// router.get('/', (req, res, next) => {
//    res.status(200).render( 'product_registration', {
//         title: 'Product registration',
//        href:"../../public/product_registration.css"
//     });
   
//  })


router.get('/', (req, res, next) => {
    Product.find()
     // .select("productName productPrice productDescription productImage productHighlights id")
    .exec()
    .then(docs =>{
        const response = {
            count : docs.length,
            products : docs.map(doc => {
                return{
                    productName : doc.productName,
                    productPrice : doc.productPrice,
                    productDescription : doc.productDescription,
                    productImage:doc.productImage,
                    productionDate:doc.productionDate,
                    productCategory:doc.productCategory,
                    productSerialNumber:doc.productSerialNumber,
                    productImage1:doc.productImage1,
                    productImage2:doc.productImage2,
                    productHighlights:doc.productHighlights,
                    productHighlights1:doc.productHighlights1,
                    productHighlights2:doc.productHighlights2,
                    productHighlights3:doc.productHighlights3,
                    userReview: doc.userReview,
                    id : doc.id,
                }
            })
        }
        res.status(200).json(response)
    })
   
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            Error :err
        })
    })
 })

 router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id :id})
    .exec()
    .then(result =>{
        res.status(200).json({
            message : "product deleted"
        });
    })
    .catch(err =>{
        res.status(500).json({
            Error :err
        })
    })
})
module.exports = router;
