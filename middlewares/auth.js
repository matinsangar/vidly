
const jwt = require('jsonwebtoken');
const config = require('config');
function auth(req, res, next) {
    const SecretKey = config.get('x-auth-token');
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Access denied. No token provided...");
    }
    try {
        const decoded = jwt.verify(token, SecretKey);
        req.user = decoded;
        next();
    } catch (exp) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = auth;