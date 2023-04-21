const User = require('../models/users');
const {
  SUCCESS,
  ERROR_INCORRECT,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_INCORRECT_MESSAGE,
  ERROR_NOT_FOUND_USER_MESSAGE,
  ERROR_DEFAULT_MESSAGE,
} = require('../utils/constants');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_INCORRECT).send({ message: ERROR_INCORRECT_MESSAGE });
      } else {
        res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(SUCCESS).send(user);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_USER_MESSAGE });
      } else {
        res.status(SUCCESS).send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res
          .status(ERROR_INCORRECT)
          .send({ message: ERROR_INCORRECT_MESSAGE });
      } else {
        res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

const getMyProfile = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_USER_MESSAGE });
      } else {
        res.status(SUCCESS).send(user);
      }
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

const editProfile = (req, res) => {
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
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_USER_MESSAGE });
      } else {
        res.status(SUCCESS).send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        res.status(ERROR_INCORRECT).send({ message: ERROR_INCORRECT_MESSAGE });
      } else {
        res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

const editAvatar = (req, res) => {
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
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_USER_MESSAGE });
      } else {
        res.status(SUCCESS).send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        res.status(ERROR_INCORRECT).send({ message: ERROR_INCORRECT_MESSAGE });
      } else {
        res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getMyProfile,
  editProfile,
  editAvatar,
};
