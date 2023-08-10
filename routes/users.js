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
    body('username').notEmpty().withMessage("Username is required").isLength({ min: 2, max: 55 }).withMessage("Name must be in range 2 to 55 char"),
    body('email').isEmail()
];

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get('/me', auth, async (req, res) => { // in this rout we dont wanna to use :id beacuse with having that id of another user 
    //we could access others data 
    // so by passing TOKEN in x-auth-token header req we only show the wanted information
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
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

    user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        },
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        const result = await user.save();
        // res.send(result);
        const payload = { _id: user._id, isAdmin: user.isAdmin };
        const SecretKey = config.get('jwtPrivateKey');
        const Token = jwt.sign(payload, SecretKey);

        // const Token = user.generateAuthToken();
        res.header('x-auth-token', Token).send(user);
        console.log(Token);
    } catch (exp) {
        console.log(exp);
    }
});
//we never save a tokne in our db or machine...

function generateToken(userId) {
    const payload = { _id: userId };
    const SecretKey = config.get('jwtPrivateKey');
    const Token = jwt.sign(payload, SecretKey);

    console.log(`the Token is : ${Token}`);
};

//generateToken("64d49b77a606bd74ef178692");


module.exports = router;
