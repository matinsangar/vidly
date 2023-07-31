const express = require('express');
const app = express();

const helmet = require('helmet');
const morgan = require('morgan');

const config = require('config');

const genres = require('./routes/generes');
app.use('/api/genres',genres);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})