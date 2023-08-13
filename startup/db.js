const winston = require('winston');
const mongoose = require('mongoose');
function clean_db() {

    mongoose.connect('mongodb://localhost/vildy')
        .then(() => winston.info("connected"))
        .finally(() => console.log("Finished task"));
};

module.exports = clean_db;