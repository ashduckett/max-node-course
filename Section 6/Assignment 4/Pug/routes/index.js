const express = require('express');
const path = require('path');

const router = express.Router();

const names = [];

router.get('/users', (req, res, next) => {
    res.render('users', {
        names
    });
    console.log(names)
});

router.post('/users', (req, res, next) => {
    res.redirect('/users');


    console.log('Route hit');
    console.log(req.body.username)
    names.push(req.body.username);
});

router.get('/', (req, res, next) => {

    res.render('index');
});


exports.routes = router;
// exports.names = names;