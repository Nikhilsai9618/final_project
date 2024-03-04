// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/book_management', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a schema for books
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    year: Number
});

// Create a model for books using the schema
const Book = mongoose.model('Book', bookSchema);

// Endpoints
// 1. GET all books
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

// 2. GET a specific book by ID
app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('The book with the given ID was not found.');
    res.send(book);
});

// More endpoints can be added for CRUD operations like POST, PUT, DELETE

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
