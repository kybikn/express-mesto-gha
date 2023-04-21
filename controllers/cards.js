const Card = require('../models/cards');
const {
  SUCCESS,
  ERROR_INCORRECT,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  ERROR_INCORRECT_MESSAGE,
  ERROR_NOT_FOUND_CARD_MESSAGE,
  ERROR_DEFAULT_MESSAGE,
} = require('../utils/constants');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => card.populate('owner'))
    .then((populatedCard) => res.status(SUCCESS).send(populatedCard))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_INCORRECT).send({ message: ERROR_INCORRECT_MESSAGE });
      } else {
        res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      res.status(SUCCESS).send(card);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
    });
};

const getCardById = (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .populate('owner')
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS).send(card);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_INCORRECT).send({ message: ERROR_INCORRECT_MESSAGE });
      } else {
        res.status(ERROR_DEFAULT).send({ message: ERROR_DEFAULT_MESSAGE });
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS).send({ message: 'Карточка удалена' });
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

const addCardLike = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS).send(card);
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

const deleteCardLike = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        res
          .status(ERROR_NOT_FOUND)
          .send({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS).send(card);
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

module.exports = {
  createCard,
  getCards,
  getCardById,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
