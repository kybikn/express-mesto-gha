const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const User = require('../models/users');
const NotFoundError = require('../errors/not-found-err');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  ERROR_NOT_FOUND_USER_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = config;

// регистрация
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userData = JSON.parse(JSON.stringify(user)); // копируем объект
      delete userData.password;
      res.status(CREATED_CODE).send({ user: userData });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User
    .findUserByCredentials({ email, password })
    .then((user) => {
      const userData = JSON.parse(JSON.stringify(user)); // копируем объект
      delete userData.password;
      const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(SUCCESS_CODE).send({ user: userData });
    })
    .catch(next);
};

const getUser = (id, req, res, next) => {
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_NOT_FOUND_USER_MESSAGE);
      } else {
        res.status(SUCCESS_CODE).send(user);
      }
    })
    .catch(next);
};

const getMyProfile = (req, res, next) => {
  const id = req.user._id;
  getUser(id, req, res, next);
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  getUser(id, req, res, next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch(next);
};

const editUser = (data, req, res, next) => {
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_NOT_FOUND_USER_MESSAGE);
      } else {
        res.status(SUCCESS_CODE).send(user);
      }
    })
    .catch(next);
};

const editProfile = (req, res, next) => {
  const { name, about } = req.body;
  const data = { name, about };
  editUser(data, req, res, next);
};

const editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const data = { avatar };
  editUser(data, req, res, next);
};

module.exports = {
  createUser,
  login,
  getMyProfile,
  getUserById,
  getUsers,
  editProfile,
  editAvatar,
};
