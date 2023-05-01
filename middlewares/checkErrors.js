const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const {
  ERROR_BAD_REQUEST,
  ERROR_CONFLICT,
  ERROR_DEFAULT,
  ERROR_BAD_REQUEST_MESSAGE,
  ERROR_CONFLICT_MESSAGE,
  ERROR_DEFAULT_MESSAGE,
} = require('../utils/constants');

module.exports = (error, req, res, next) => {
  if (error instanceof mongoose.Error && error.code === 11000) {
    res.status(ERROR_CONFLICT).send({ message: ERROR_CONFLICT_MESSAGE });
  } else if (error.statusCode) {
    res.status(error.statusCode).send({ message: error.message });
  } else if (error instanceof CastError || error instanceof ValidationError) {
    res.status(ERROR_BAD_REQUEST).send({ message: ERROR_BAD_REQUEST_MESSAGE });
  } else {
    res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
  }
  next(); // пропускаем запрос дальше
};
