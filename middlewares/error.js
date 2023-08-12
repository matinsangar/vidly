const winston = require('winston');
function errHandler(err, req, res, next) {
    winston.error(err.message, err);
    res.status(500).send("Something Failed TryAgainLater...");

    //there's no need to continue processing 
    //so do not say next();

}

module.exports = errHandler;