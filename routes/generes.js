const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

router.use(express.json());

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true },
    category: { type: String, required: true, enum: ['comedy', 'drama', 'si-fi'] },
    director: {
        type: String,
        required: true,
        validate: {
            validator: function (v) { return v.length >= 3; },
        }
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) { return v.length > 0; },
        }
    },
    data: { type: Date, default: Date.now },
    isPublished: { type: Boolean, required: true },
    price: {
        type: Number,
        min: [0],
        max: [20, 'please lower the price ...'],
        required: function () { return this.isPublished; }
    }
});
async function creatGenre() {
    const Genre = mongoose.model('Genre', genreSchema);
    const genre = new Genre({
        name: "Interstellar",
        category: "si-fi",
        director: "Christopher Nolan",
        tags: ['space', 'exploration', 'time dilation'],
        isPublished: true,
        price: 11
    });
    try {
        const result = await genre.save();
        console.log(result);
    } catch (ex) {
        console.error(ex);
    }
}

//creatGenre();

// Validation middleware for POST route
const postValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

router.get('/', async (req, res) => {
    const genre = await mongoose.model('Genre', genreSchema).find();
    res.send(genre);
});


router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    const genre = await mongoose.model('Genre', genreSchema);
    try {
        const founded_genre = await genre.findById(givenID);
        if (!founded_genre) {
            return res.status(404).send("The genre with the given id was not found");
        } else {
            // console.log(founded_genre.name);
            res.send(founded_genre)
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

    const Genre = await mongoose.model('Genre', genreSchema);
    const genre = new Genre({
        name: req.body.name,
        category: req.body.category,
        director: req.body.director,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
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
    const genre = await mongoose.model("Genre", genreSchema);
    const givenID = req.params.id;
    try {
        const founded_genre = await genre.findByIdAndUpdate(
            givenID,
            {
                name: req.body.name,
                category: req.body.category,
                director: req.body.director,
                tags: req.body.tags,
                isPublished: req.body.isPublished,
                price: req.body.price,
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
    const genre = await mongoose.model("Genre", genreSchema);
    try {
        const result = await genre.findByIdAndDelete(genreID);
        console.log(result);
        return res.status(200).send("Delted");
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});
module.exports = router;
