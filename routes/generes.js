const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

router.use(express.json());

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true },
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre() {
    const genre = new Genre({
        name: "Biography"
    });
    try {
        const result = await genre.save();
        console.log(result);
    } catch (ex) {
        console.error(ex);
    }
}

createGenre();

// Validation middleware for POST route
const postValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 3 characters'),
];

router.get('/', async (req, res) => {
    const genre = await Genre.find();
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    try {
        const founded_genre = await Genre.findById(givenID);
        if (!founded_genre) {
            return res.status(404).send("The genre with the given id was not found");
        } else {
            res.send(founded_genre);
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

    const genre = new Genre({
        name: req.body.name
    });
    try {
        const result = await genre.save();
        res.send(genre);
        console.log(result);
    } catch (ex) {
        console.error(ex);
    }
});

// Validation middleware for PUT route
const putValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 3 characters'),
];

router.put('/:id', putValidationData, async (req, res) => {
    const givenID = req.params.id;
    try {
        const founded_genre = await Genre.findByIdAndUpdate(
            givenID,
            {
                name: req.body.name
            },
            { new: true } // Return the updated genre
        );
        if (!founded_genre) {
            return res.status(404).send(`the genre with given id: ${givenID} was not found`);
        } else {
            res.send(founded_genre);
        }
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});

router.delete('/:id', async (req, res) => {
    const genreID = req.params.id;
    try {
        const result = await Genre.findByIdAndDelete(genreID);
        console.log(result);
        return res.status(200).send("Deleted");
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});


module.exports = router;