const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('hbs', engine( { defaultLayout: 'main-layout', layoutsDir: 'views/layouts/', extname: 'hbs' } ));
// app.set('view engine', 'pug');
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});


app.listen(3000);