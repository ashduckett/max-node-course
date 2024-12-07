const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const routes = require('./routes/index');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(routes.routes);

app.use('/', (req, res, next) => {
    res.render('404');

});




app.listen(3000);