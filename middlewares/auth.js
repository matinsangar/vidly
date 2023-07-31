function Authenticating(req, res, next) {
    console.log("Authenticating from imported function...");
    next();
}
module.exports.auth = Authenticating;