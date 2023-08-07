const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Movie = require('../models/movies');
const Rental = require('../models/rental');
const { Member } = require('../models/members');
router.use(express.json());

async function addRental(member_name, movie_title, dateOut, dateReturned, rentalFee) {
    try {
        const given_mem = await Member.findOne({ name: member_name });
        const given_movie = await Movie.findOne({ title: movie_title });
        if (!given_mem || !given_movie) {
            console.error('not found.');
            return;
        }
        const rental = new Rental({
            member: {
                _id: given_mem._id,
                name: given_mem.name,
                phone: given_mem.phone,
                isGold: given_mem.isGold
            },
            movie: {
                _id: given_movie._id,
                title: given_movie.title,
                dailyRentalRate: given_movie.dailyRentalRate
            },
            dateOut,
            dateReturned,
            rentalFee
        })
        const result = await rental.save();
        console.log(result);
    } catch (exp) {
        console.error(exp);
    }
};

router.get('/', async (req, res) => {

    // const rentals = await Rental.find().sort('-dateOut');
    //res.send(rentals);

    addRental('tony adams', 'Interstellar', 3, 5, 10);
    res.send("new Rental addedd");
});

const postValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

router.post('/', postValidationData, async (req, res) => {
    // console.log(req.body.memberId);
    // console.log(req.body.movieId);
    const mem = await Member.findById(req.body.memberId);
    const movie = await Movie.findById(req.body.movieId);
    try {
        if (!mem || !movie) {
            res.status(400).send("Invalid");
        }
        let rental = new Rental({
            member: {
                _id: mem._id,
                name: mem.name,
                phone: mem.phone,
                isGold: mem.isGold
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });
        movie.dailyRentalRate++;
        const result = await rental.save();
        movie.save();
        console.log(result);
        res.send(result);
    } catch (exp) {
        console.error(exp);
    }
});

module.exports = router;