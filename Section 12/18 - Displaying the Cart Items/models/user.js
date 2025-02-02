const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;


class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1 }] };
        const db = getDb();
        return db
            .collection('users')
            .updateOne({_id: new ObjectId(this._id)}, { $set: { cart: updatedCart } } 
        );
    }

    getCart() {
        const db = getDb();

        // Isolate the objects in the DB
        // so we have an array of ids of the items in the cart
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });

        return db
            .collection('products')
            .find({_id: { $in: productIds }})
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
                });
            });
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({_id: new ObjectId(userId) })
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => console.log(err));

    }
}

module.exports = User;