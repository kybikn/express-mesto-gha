const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validationRules = require('../utils/validationRules');

const {
  getMyProfile,
  getUserById,
  getUsers,
  editProfile,
  editAvatar,
} = require('../controllers/users');

usersRouter.get('/me', getMyProfile); // возвращает собсвенный профиль пользователя

usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    // нужно ли прописывать required для id, ведь без id запрос сюда и не придет ?
    id: validationRules.id,
  }),
}), getUserById); // возвращает пользователя по _id

usersRouter.get('/', getUsers); // возвращает всех пользователей

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: validationRules.name,
    about: validationRules.about,
  }),
}), editProfile); // обновляет профиль

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: validationRules.avatar,
  }),
}), editAvatar); // обновляет аватар

module.exports = usersRouter;
