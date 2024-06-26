const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/article'); // Replace with your actual model import

mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error(err);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
    try {
        const articles = await Article.find({});
        res.render('index', {
            title: 'Articles',
            articles: articles
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching articles');
    }
});

app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
