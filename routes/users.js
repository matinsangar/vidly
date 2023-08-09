const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
router.use(express.json());

const postValidationData = [
    //body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 3 characters'),
];

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', auth, postValidationData, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array().map((err) => err.msg));
        return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send("Already we have this user...");
    }

    user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        },
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        const result = await user.save();
        // res.send(result);
        const payload = { _id: user._id };
        const SecretKey = config.get('jwtPrivateKey');
        const Token = jwt.sign(payload, SecretKey);

        // const Token = user.generateAuthToken();
        res.header('x-auth-token', Token).send(user);
        console.log(result);
    } catch (exp) {
        console.log(exp);
    }
});

module.exports = router;