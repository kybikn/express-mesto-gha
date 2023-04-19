const usersRouter = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  getMyProfile,
  editProfile,
  editAvatar,
} = require('../controllers/users');

usersRouter.get('/me', getMyProfile); // возвращает собсвенный профиль пользователя
usersRouter.get('/:id', getUserById); // возвращает пользователя по _id
usersRouter.get('/', getUsers); // возвращает всех пользователей
usersRouter.post('/', createUser); // создаёт пользователя
usersRouter.patch('/me', editProfile); // обновляет профиль
usersRouter.patch('/me/avatar', editAvatar); // обновляет аватар

module.exports = usersRouter;
