const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Movie = require('../models/movies');
const { Genre } = require('../models/genre');

router.use(express.json());

async function createMovie(title, price, dailyRentalRate, genreName) {
    try {
        const genre = await Genre.findOne({ name: genreName });
        if (!genre) {
            console.log('Genre not found.');
            return;
        }

        const movie = new Movie({
            title,
            price,
            dailyRentalRate,
            genre: genre._id
        });

        const result = await movie.save();
        console.log('New movie created:', result);
    } catch (ex) {
        console.error('Error creating movie:', ex);
    }
}

router.get('/test', async (req, res) => {
    try {
        createMovie('John Wick', 18, 5, 'action');
        createMovie('Rocky', 15, 4, 'sport');
        createMovie('Schindler\'s List', 16, 4, 'historical');
        createMovie('The Shawshank Redemption', 17, 4, 'drama');
        createMovie('Spirited Away', 10, 4, 'anime');
        createMovie('The Dark Knight', 16, 5, 'action');
        createMovie('Moneyball', 12, 3, 'sport');
        createMovie('Braveheart', 18, 4, 'historical');
        
        res.send('Movie created successfully.');
    } catch (error) {
        res.status(500).send('Something went wrong');
    }
});

// Other routes for getting, updating, and deleting movies

module.exports = router;
