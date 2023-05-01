const { Joi } = require('celebrate');
const { urlRegex } = require('./constants');

const validationRules = {
  id: Joi.string().required().hex().length(24),
  name: Joi.string().required().min(2).max(40),
  about: Joi.string().required().min(2).max(30),
  nameSignUp: Joi.string().min(2).max(40),
  aboutSignUp: Joi.string().min(2).max(30),
  avatar: Joi.string().min(2).pattern(urlRegex),
  email: Joi.string().required().email().min(3),
  password: Joi.string().required().min(6),
  link: Joi.string().required().min(2).pattern(urlRegex),
};

module.exports = validationRules;
