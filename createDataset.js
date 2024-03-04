// Import required modules
const mongoose = require('mongoose');

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

// Generate larger sample data
const generateSampleBooks = (count) => {
    const sampleBooks = [];
    for (let i = 1; i <= count; i++) {
        sampleBooks.push({
            title: `Book ${i}`,
            author: `Author ${i}`,
            genre: i % 2 === 0 ? 'Fiction' : 'Non-fiction',
            year: 2000 + i // Assuming books from 2001 onwards
        });
    }
    return sampleBooks;
}

// Insert larger sample data into MongoDB
async function insertLargeSampleData() {
    const sampleBooks = generateSampleBooks(100); // Generate 100 sample books
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log('Large sample data inserted successfully');
}

// Call the function to insert larger sample data
insertLargeSampleData();
