const express = require('express');
const app = express();

const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//routers
const genres = require('./routes/genres');
const home = require('./routes/home');
const members = require('./routes/members');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
app.use('/api/genres', genres);
app.use('/', home);
app.use('/api/members', members);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const startUpDebugger = require('debug')("app:startup");
//MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vildy')
    .then(() => console.log("connected"))
    .catch(err => console.error(err))
    .finally(() => console.log("Finished task"));



//config
const config = require('config');
console.log("The app name is: ", config.get('name'));
console.log("The Mail Server is: ", config.get('mail'));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
if (process.env.NODE_ENV === "development") {
    console.log("Morgan is active....");
    app.use(morgan('tiny'));
    startUpDebugger("HELLO now we are in startUp debugger in development mode");
}

//middlewares
// const logger = require('./middlewares/log');
// const auth = require('./middlewares/auth');
// app.use(logger.log);
// app.use(auth.auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});