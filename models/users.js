const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-err');
const {
  ERROR_UNAUTHORIZED_WRONG_MESSAGE,
  urlRegex,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: 2,
    maxLength: 40,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    minLength: 2,
    maxLength: 500,
    validate: {
      validator: (link) => {
        urlRegex.test(link);
      },
      message: 'Невалидная ссылка',
    },
  },
  email: {
    type: String,
    minLength: 3,
    maxLength: 40,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Поле email должно быть валидным',
    },
  },
  password: {
    type: String,
    minLength: 6,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(ERROR_UNAUTHORIZED_WRONG_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(ERROR_UNAUTHORIZED_WRONG_MESSAGE);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
