require('express-async-errors'); //amazing way to catch errors at runtime without using try/catch blocks in your async functions

const winston = require('winston');
require('winston-mongodb');

function clean_log() {
    winston.configure({
        transports: [
            new winston.transports.File({ filename: 'logfile.log' }),
            new winston.transports.Console(),   //for tracking in console 
            new winston.transports.MongoDB({
                db: 'mongodb://localhost/vildy',
                collection: 'logs',
                storeHost: true,
                options: { useUnifiedTopology: true },
                level: 'info'
            })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: 'UncoughtExeptions.log' })
        ],
        rejectionHandlers: [
            new winston.transports.File({ filename: "UnhandledRejection.log" })
        ]
    });
};

module.exports = clean_log;