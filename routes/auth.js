const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/users');
const urlRegex = require('../utils/constants');

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(3)
      .max(40),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().min(2).max(500).regex(urlRegex), // pattern(/^(https:|http:|www\.)\S*/),
  }),
}), createUser);

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(3)
      .max(40),
    password: Joi.string().required().min(6),
  }),
}), login);

module.exports = authRouter;
