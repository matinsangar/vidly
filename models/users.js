const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);

module.exports = User;