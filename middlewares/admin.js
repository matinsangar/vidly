function auth(req, res, next) {
    //403 FORBIDDEN
    //401 UnAUTHORIZED
    if (!req.user.isAdmin) {
        return res.status(403).send("Access denied..."); //Forbidden 
        // in 401 status we give a second chance to the user to input the right token 
    }
    next();
}

module.exports = auth;