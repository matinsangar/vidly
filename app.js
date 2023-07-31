const express = require('express');
const app = express();

const helmet = require('helmet');
const morgan = require('morgan');

const config = require('config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genres = [
    { id: 1, name: "genere1" },
    { id: 2, name: "genere2" },
    { id: 3, name: "genere3" }
]

app.get('/', (req, res) => {
    res.send(genres);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})