const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Article = require('./models/article');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/nodekb');
const db = mongoose.connection;

// MongoDB connection event handlers
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for DB erors
db.on('error', (err) => {
    console.error(err);
});

// Initialize Express application
const app = express();

// Set up view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Route to fetch and display articles
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

// Route to render the form for adding new articles
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
