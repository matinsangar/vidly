const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
function clean_db() {
    const db = config.get("db");
    mongoose.connect(db)
        .then(() => winston.info(`connected ${db}`));
    //we dont need the catch block beacuse we have handled the uncought rejected promise    
};

module.exports = clean_db;