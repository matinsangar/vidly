const express = require('express');
const app = express();

const helmet = require('helmet');
const morgan = require('morgan');

const config = require('config');

const genres = require('./routes/generes');
const home = require('./routes/home');

app.use('/api/genres', genres);
app.use('/', home);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
if (process.env.NODE_ENV === "development") {
    console.log("Morgan is active....");
    app.use(morgan('tiny'));
}


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})