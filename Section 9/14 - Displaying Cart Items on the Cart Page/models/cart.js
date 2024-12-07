const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename), 
    'data',
    'cart.json'
);

module.exports = class Cart {

    // Adds a product to the cart.
    static addProduct(id, productPrice) {

        // Read the file and put the contents into fileContent
        fs.readFile(p, (err, fileContent) => {
            // Start with an empty cart
            let cart = { products: [], totalPrice: 0 };

            // If there's no error, parse the JSON into JavaScript objects
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Search for the product in the read products and if the product id is found give us the index
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);

            // Get hold of the existing product itself
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            // If the product exists in the list already
            if (existingProduct) {

                // Grab a copy of the existing product
                updatedProduct = { ...existingProduct };

                // Increment the quantity.
                updatedProduct.qty = updatedProduct.qty + 1;

                // Get a copy of the cart's products array
                cart.products = [...cart.products];

                // Update the product at the correct index with that new quantity
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // If the product didn't exist, create a new object with the correct id and set the quantity to 1.
                updatedProduct = { id: id, qty: 1 };

                // Set the cart's products to be the same set of cart products but with the updated product added.
                cart.products = [...cart.products, updatedProduct];
            }

            // Increment the total price
            cart.totalPrice = cart.totalPrice + +productPrice;

            // Write the new cart to the file.
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.filter(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });

        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
};