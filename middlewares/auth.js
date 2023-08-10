const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const secretKey = config.get('jwtPrivateKey');
    const token = req.header("x-auth-token"); //extrat the token

    if (!token) {
        return res.status(401).send("Access denied. No token provided!!! Try agian later...");
    }
    try {
        const decoded = jwt.verify(token, secretKey); // if token and secKey can match then decoded return an object
        req.user = decoded; //here we use this opbject   //not req.body
        next();  //!!!
    } catch (exp) {
        res.status(400).send("Invalid Token");
    }
}

module.exports = auth;
