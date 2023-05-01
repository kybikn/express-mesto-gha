const jwt = require('jsonwebtoken');
const config = require('../config');

const UnauthorizedError = require('../errors/unauthorized-err');
const {
  ERROR_UNAUTHORIZED_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = config;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError(ERROR_UNAUTHORIZED_MESSAGE));
  }
  let payload;
  const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    next(new UnauthorizedError(ERROR_UNAUTHORIZED_MESSAGE));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
