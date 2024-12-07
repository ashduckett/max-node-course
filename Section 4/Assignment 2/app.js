const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('Middleware 1');
//     next();
// });

// app.use((req, res, next) => {
//     console.log('Middleware 2');
//     res.send('<h1>Welcome to Assignment 2</h1>');
// });


app.use('/favicon.ico', (req, res, next) => {
    return;
});

app.use('/users', (req, res, next) => {
    console.log('Welcome to slash users');
    
    res.send('Users');
});

app.use('/', (req, res, next) => {
    console.log('Welcome to slash')
    res.send('Home');
});


app.listen(3000);