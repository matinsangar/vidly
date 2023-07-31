const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const genres = [
    { id: 1, name: "genere1" },
    { id: 2, name: "genere2" },
    { id: 3, name: "genere3" }
];

// Validation middleware for POST route
const postValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genere = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genere) {
        return res.status(404).send("The genre with given id was not found");
    } else {
        res.send(genere);
    }
});

router.post('/', postValidationData, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array().map((err) => err.msg));
        return res.status(400).json({ errors: errors.array() });
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }
    genres.push(genre);
    res.send(genres);
});
// Validation middleware for PUT route
const putValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];
router.put('/:id', putValidationData, (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The genre with given id was not found');
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array().map((err) => err.msg));
        return res.status(400).json({ errors: errors.array() });
    }

    genres.name = req.body.name;
    res.send(genre);
});
router.delete('/:id', (req, res) => {
    const genreID = parseInt(req.params.id);
    const genreIndex = genres.findIndex((g) => g.id === genreID)
    if (genreIndex === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }
    const deletedGenre = genres.splice(genreIndex, 1)[0];
    res.json({ message: 'genre deleted successfully', deletedGenre });
});
module.exports = router;
