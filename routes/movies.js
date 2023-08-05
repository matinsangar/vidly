const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Movie = require('../models/movies'); // Import the Movie model

router.use(express.json());

// Validation middleware for POST route
const postValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('dailyRate').notEmpty().withMessage('Daily rate is required').isNumeric().withMessage('Daily rate must be a number'),
    body('genre.name').notEmpty().withMessage('Genre name is required').isLength({ min: 2 }).withMessage('Genre name must be at least 2 characters'),
];


async function createMovie() {
    const movie = new Movie({
        name: "Test Movie",
        price: 10,
        dailyRate: 4,
        genre: {
            name: "drama",
        },
    });
    try {
        const result = await movie.save();
        console.log("Created movie:", result);
    } catch (ex) {
        console.error("Error creating movie:", ex);
    }
}

//createMovie();

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    try {
        const founded_movie = await Movie.findById(givenID);
        if (!founded_movie) {
            return res.status(404).send("The movie with the given id was not found");
        } else {
            res.send(founded_movie);
        }
    } catch (exp) {
        console.error(exp);
    }
});

router.post('/', postValidationData, async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array().map((err) => err.msg));
        return res.status(400).json({ errors: errors.array() });
    }

    const movie = new Movie({
        name: req.body.name,
        price: req.body.price,
        dailyRate: req.body.dailyRate,
        genre: {
            name: req.body.genre.name,
        },
    });
    try {
        const result = await movie.save();
        res.send(movie);
        console.log(result);
    } catch (ex) {
        console.error("Error creating movie:", ex);
    }
});

const putValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
    body('dailyRate').notEmpty().withMessage('Daily rate is required').isNumeric().withMessage('Daily rate must be a number'),
    body('genre.name').notEmpty().withMessage('Genre name is required').isLength({ min: 2 }).withMessage('Genre name must be at least 2 characters'),
];

router.put('/:id', putValidationData, async (req, res) => {
    const givenID = req.params.id;
    try {
        const founded_movie = await Movie.findByIdAndUpdate(
            givenID,
            {
                name: req.body.name,
                price: req.body.price,
                dailyRate: req.body.dailyRate,
                genre: {
                    name: req.body.genre.name,
                },
            },
            { new: true } // Return the updated movie
        );
        if (!founded_movie) {
            return res.status(404).send(`The movie with given id: ${givenID} was not found`);
        } else {
            res.send(founded_movie);
        }
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});

router.delete('/:id', async (req, res) => {
    const movieID = req.params.id;
    try {
        const result = await Movie.findByIdAndDelete(movieID);
        console.log(result);
        return res.status(200).send("Deleted");
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});

module.exports = router;
