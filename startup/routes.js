const express = require('express');

const genres = require('../routes/genres');
const home = require('../routes/home');
const members = require('../routes/members');
const movies = require('../routes/movies');
const rentals = require('../routes/rental');
const users = require('../routes/users');
const auth = require('../routes/auth');

const error_middleware = require('../middlewares/error');

function clean_routes(app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/', home);
    app.use('/api/members', members);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error_middleware);
}

module.exports = clean_routes;