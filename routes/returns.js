const express = require('express');
const router = express.Router();
router.use(express.json());
router.post('/', async (req, res) => {
    if (!req.body.memberId) {
        return res.status(400).send("customerId not provided");
    }
    if (!req.body.movieId) {
        return res.status(400).send("movieId not provided");
    }
    res.status(401);
});

module.exports = router;