const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');
router.use(express.json());




const validate = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 3, max: 255 }).withMessage('Password must be between 3 and 255 characters'),
];

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', validate, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Incorrect email or password");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send("Incorrect email or password");
        }
        const token = user.generateAuthToken();
        res.send(token);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
});

module.exports = router;
