const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 55
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
