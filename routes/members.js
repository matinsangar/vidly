const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Member, createMember } = require('../models/members');

router.use(express.json());

router.get('/', async (req, res) => {
    const members = await Member.find();
    res.send(members);
});

router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    try {
        const founded_member = await Member.findById(givenID);
        if (!founded_member) {
            return res.status(404).send("The member with the given id was not found");
        } else {
            res.send(founded_member);
        }
    } catch (exp) {
        console.error(exp);
    }
});

const postValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
];

router.post('/', postValidationData, async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array().map((err) => err.msg));
        return res.status(400).json({ errors: errors.array() });
    }

    const member = new Member({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    try {
        const result = await member.save();
        res.send(member);
        console.log(result);
    } catch (ex) {
        console.error(ex);
    }
});

const putValidationData = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 3 characters'),
];

router.put('/:id', putValidationData, async (req, res) => {
    const givenID = req.params.id;
    try {
        const founded_member = await Member.findByIdAndUpdate(
            givenID,
            {
                name: req.body.name,
                isGold: req.body.isGold,
                phone: req.body.phone
            },
            { new: true } // Return the updated genre
        );
        if (!founded_member) {
            return res.status(404).send(`The member with given id: ${givenID} was not found`);
        } else {
            res.send(founded_member);
        }
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});

router.delete('/:id', async (req, res) => {
    const memberID = req.params.id;
    try {
        const result = await Member.findByIdAndDelete(memberID);
        console.log(result);
        return res.status(200).send("Deleted");
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});

module.exports = router;
