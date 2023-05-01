const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validationRules = require('../utils/validationRules');
const { createUser, login } = require('../controllers/users');

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: validationRules.email,
    password: validationRules.password,
    name: validationRules.nameSignUp,
    about: validationRules.aboutSignUp,
    avatar: validationRules.avatar,
  }),
}), createUser);

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: validationRules.email,
    password: validationRules.password,
  }),
}), login);

module.exports = authRouter;
