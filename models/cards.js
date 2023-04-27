const mongoose = require('mongoose');
const {
  urlRegex,
} = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 40,
    required: true,
  },
  link: {
    type: String,
    minLength: 2,
    maxLength: 500,
    required: true,
    validate: {
      validator: (link) => {
        urlRegex.test(link);
      },
      message: 'Невалидная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
