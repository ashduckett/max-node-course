const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render(
                'shop/product-list', {
                path: '/products',
                prods: products, 
                pageTitle: 'All Products'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({where: {id: prodId}})
    //    .then(products => {
    //         res.render(
    //             'shop/product-detail', { 
    //             product: products[0], 
    //             pageTitle: products[0].title,
    //             path: '/products'
                
    //         });
    //     })
    //     .catch(err => console.log(err));
   
    Product.findByPk(prodId)
        .then((product) => {
            res.render(
                'shop/product-detail', { 
                product: product, 
                pageTitle: product.title,
                path: '/products'
                
            });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render(
            'shop/index', {
            path: '/',
            prods: products, 
            pageTitle: 'Shop'
        });  
    })
    .catch(err => {
        console.log(err);
    });
        
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        // Get all of the products
        Product.fetchAll(products => {
        // Start with an empty list of products
        const cartProducts = [];

        // Run over every product we possibly have
        for (let product of products) {

            // Get hold of the cart version of the product of the current product if it's there
            // So it's just like saying "If the current product is in the cart". This will result in
            // more iterations than is necessary but it works.
            const cartProductData = cart.products.find(prod => prod.id === product.id);
            
            // If the cart version is there we can get the real product and add it, along with the
            // found cart version's quantity
            if (cartProductData) {
                cartProducts.push({ productData: product, qty: cartProductData.qty });
            }
        }
        
        // Pass the array to the view.
        res.render(
            'shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            }
        );
    });
    });
    
    
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};


exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('Received a product id of ' + prodId);
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};


exports.getOrders = (req, res, next) => {
    res.render(
        'shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders'
        }
    );
};


exports.getCheckout = (req, res, next) => {
    res.render(
        'shop/checkout', {
            path: '/checkout',
            pageTitle: 'Checkout'
        }
    );
};