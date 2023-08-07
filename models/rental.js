const mongoose = require("mongoose");

const Rental = mongoose.model("Rental", new mongoose.Schema({
    member: {
        type: new mongoose.Schema({
            name: {
                type: String,
                lowercase: true,
                required: true,
                maxlenght: 50,
                minlenght: 3,
            },
            isGold: {
                type: Boolean,
                default: false,
            },
            phone: {
                type: String,
                length: 4,
                required: true,
            }
        }),
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 55
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true,
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));


module.exports = Rental;