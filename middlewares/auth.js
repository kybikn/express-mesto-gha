const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedError = require('../errors/unauthorized-err');
const {
  ERROR_UNAUTHORIZED_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(ERROR_UNAUTHORIZED_MESSAGE);
  }
  let payload;
  const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new UnauthorizedError(ERROR_UNAUTHORIZED_MESSAGE);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
