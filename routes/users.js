const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMyProfile,
  getUserById,
  getUsers,
  editProfile,
  editAvatar,
} = require('../controllers/users');
const { urlRegex } = require('../utils/constants');

usersRouter.get('/me', getMyProfile); // возвращает собсвенный профиль пользователя

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById); // возвращает пользователя по _id

usersRouter.get('/', getUsers); // возвращает всех пользователей

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(30),
  }),
}), editProfile); // обновляет профиль

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2).max(500).pattern(urlRegex),
  }),
}), editAvatar); // обновляет аватар

module.exports = usersRouter;
