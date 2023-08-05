const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');


router.use(express.json());

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true, min: 3, max: 55 },
    isGold: { type: Boolean, default: false },
    data: { type: Date, default: Date.now },
    phone: { type: String, required: true, min: 3, max: 5 },
})

async function creatMember() {
    const Member = mongoose.model("Member", memberSchema);
    const member = new Member({
        name: "Ian Wright",
        isGold: true,
        phone: "5432"
    });
    try {
        const result = await member.save();
        console.log(result);
    } catch (exp) {
        console.error(exp);
    }
}

//creatMember();

router.get('/', async (req, res) => {
    const member = await mongoose.model("Member", memberSchema).find();
    res.send(member);
});

router.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    const member = await mongoose.model("Member", memberSchema);
    try {
        const founded_member = await member.findById(givenID);
        if (!founded_member) {
            return res.status(404).send("The genre with the given id was not found");
        } else {
            // console.log(founded_member.name);
            res.send(founded_member)
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

    const Member = await mongoose.model("Member", memberSchema);
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
    const member = await mongoose.model("Member", memberSchema);
    const givenID = req.params.id;
    try {
        const founded_member = await member.findByIdAndUpdate(
            givenID,
            {
                name: req.body.name,
                isGold: req.body.isGold,
                phone: req.body.phone
            },
            { new: true } // Return the updated genre
        );
        if (!founded_member) {
            return res.status(404).send(`the genre with given id: ${givenID} was not found`);
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
    const member = await mongoose.model("Member", memberSchema);
    try {
        const result = await member.findByIdAndDelete(memberID);
        console.log(result);
        return res.status(200).send("Delted");
    } catch (exp) {
        res.status(500).send('Something went wrong');
        console.error(exp);
    }
});

module.exports = router;