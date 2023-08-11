function errHandler(err, req, res, next) {
    res.status(500).send("Something Failed...");
    next();
}

module.exports = errHandler;