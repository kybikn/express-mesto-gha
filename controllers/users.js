const User = require('../models/users');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getUserId = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((error) => res.status(400).send(error));
};

const getMyProfile = (req, res) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => res.send(user))
    .catch((error) => res.status(400).send(error));
};

const editProfile = (req, res) => {
  const { name, about } = req.body;
  // const { _id } = req.user;
  const { id } = req.params;
  User.findByIdAndUpdate({ name, about, id })
    .then((user) => res.send(user))
    .catch((error) => res.status(400).send(error));
};

const editAvatar = (req, res) => {
  const { avatar } = req.body;
  // const { _id } = req.user;
  const { id } = req.params;
  User.findByIdAndUpdate({ avatar, id })
    .then((user) => res.send(user))
    .catch((error) => res.status(400).send(error));
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  getMyProfile,
  editProfile,
  editAvatar,
};
