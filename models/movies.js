const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true }
});

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 55
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  genre: genreSchema
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
