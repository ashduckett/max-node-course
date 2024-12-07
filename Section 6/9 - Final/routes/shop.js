const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    console.log(products.length);            
    res.render(
        'shop', {
            path: '/',
            prods: products, 
            pageTitle: 'Shop', 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
});

module.exports = router;