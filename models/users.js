const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 55,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 55,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 1024,
    }
});
userSchema.method.generateAuthToken = function () {
    const payload = { _id: this._id };
    const SecretKey = config.get("jwtPrivateKey");
    const Token = jwt.sign(payload, SecretKey);
    return Token;
}
const User = mongoose.model("User", userSchema);

module.exports = User;