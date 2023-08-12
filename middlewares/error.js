function errHandler(err, req, res, next) {
    res.status(500).send("Something Failed TryAgainLater...");
    next();
}

module.exports = errHandler;