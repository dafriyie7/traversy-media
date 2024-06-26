// import modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection



// Check for DB errors
db.on('eror', (err) {
    console.log(err);
});

// init App
const app = express();

// Load View ENgine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home route
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article One',
            author: 'Daniel Afriyie',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article Two',
            author: 'Daniel Afriyie',
            body: 'This is article two'
        },{
            id: 3,
            title: 'Article Three',
            author: 'Daniel Afriyie',
            body: 'This is article three'
        }
    ];

    res.render('index', {
        title: 'Articles',
        articles: articles
    });
});

// Add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add articles'
    });
});

// Start Server
app.listen(3000, () => {
    console.log(`Server is runnin on port 3000...`)
});