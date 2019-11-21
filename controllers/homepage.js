const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = require('./../models/Products');
router.get('/', (req, res, next) => {
     Product.find({
        '_id': { $in: [
            mongoose.Types.ObjectId('5dd6c9ab03cde25f22bc43b2'),
            mongoose.Types.ObjectId('5dd6c63503cde25f22bc43aa'), 
            mongoose.Types.ObjectId('5dd6b6464f47e85111942625'),
            mongoose.Types.ObjectId('5dd6a9e34f47e85111942622'),
            mongoose.Types.ObjectId('5dd6a5cd4f47e8511194261e'),
            mongoose.Types.ObjectId('5dd69063096f5248952ba6d1'),
            mongoose.Types.ObjectId('5dd66a90ec31e125947bc4ab'),
            mongoose.Types.ObjectId('5dd666e4ec31e125947bc4a9'),
            mongoose.Types.ObjectId('5dd65483ec31e125947bc4a2'),
        ]}
     })
    .exec()
    .then(docs =>{
                return res.render('homepage', {
                    title: 'E-Commerce Website',
                    css: 'homepage.css',
                    products:docs
                });    
               
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            Error :err
        })
    })
 })

 module.exports = router;