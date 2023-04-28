const {
  ERROR_BAD_REQUEST,
  ERROR_CONFLICT,
  ERROR_DEFAULT,
  ERROR_BAD_REQUEST_MESSAGE,
  ERROR_CONFLICT_MESSAGE,
  ERROR_DEFAULT_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports = (error, req, res, next) => {
  if (error.code === 11000) {
    res.status(ERROR_CONFLICT).send({ message: ERROR_CONFLICT_MESSAGE });
  } else if (error instanceof NotFoundError
    || error instanceof UnauthorizedError
    || error instanceof ForbiddenError) {
    res.status(error.statusCode).send({ message: error.message });
  } else if (error.name === 'CastError' || error.name === 'ValidationError') {
    res.status(ERROR_BAD_REQUEST).send({ message: ERROR_BAD_REQUEST_MESSAGE });
  } else {
    res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
  }
  next(); // пропускаем запрос дальше
};
