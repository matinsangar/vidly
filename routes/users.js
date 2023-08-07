const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/users');

router.use(express.json());

const postValidationData = [
    //body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 3 characters'),
];

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', postValidationData, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array().map((err) => err.msg));
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("Already we have this user...");
    }
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const result = await user.save();
        res.send(result);
        console.log(result);
    } catch (exp) {
        console.log(exp);
    }
});

module.exports = router;