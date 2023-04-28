const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/users');
const NotFoundError = require('../errors/not-found-err');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  CREATED_CODE_MESSAGE,
  ERROR_NOT_FOUND_USER_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

// регистрация
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.status(CREATED_CODE).send({ message: CREATED_CODE_MESSAGE });
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

const getMyProfile = (req, res, next) => {
  const id = req.user._id;
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

const getUserById = (req, res, next) => {
  const { id } = req.params;
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

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch(next);
};

const editProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
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

const editAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { avatar },
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

module.exports = {
  createUser,
  login,
  getMyProfile,
  getUserById,
  getUsers,
  editProfile,
  editAvatar,
};
