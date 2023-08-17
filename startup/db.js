const winston = require('winston');
const mongoose = require('mongoose');
function clean_db() {

    mongoose.connect('')
        .then(() => winston.info("connected"))
    //we dont need the catch block beacuse we have handled the uncought rejected promise    
};

module.exports = clean_db;