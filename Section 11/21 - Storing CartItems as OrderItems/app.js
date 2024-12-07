const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// One to One
User.hasOne(Cart);
Cart.belongsTo(User);

// Many to Many
Cart.belongsToMany(Product, { through: CartItem } );
Product.belongsToMany(Cart, { through: CartItem } );

// One to many. One user has many orders, but one order can only have one
// user.
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // .sync(  {force: true}  )
    .sync()
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    //     app.listen(3000);
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Max', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        // console.log(user)
        return user.createCart();
        
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

