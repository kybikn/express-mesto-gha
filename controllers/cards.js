const Card = require('../models/cards');
const {
  SUCCESS_CODE,
  SUCCESS_CODE_MESSAGE,
  ERROR_FORBIDDEN_MESSAGE,
  ERROR_NOT_FOUND_CARD_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => card.populate('owner'))
    .then((populatedCard) => {
      res.status(SUCCESS_CODE).send(populatedCard);
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      res.status(SUCCESS_CODE).send(card);
    })
    .catch(next);
};

const getCardById = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS_CODE).send(card);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      }
      if (card.owner._id.toString() !== userId) {
        throw new ForbiddenError({ message: ERROR_FORBIDDEN_MESSAGE });
      }
      Card.findByIdAndRemove(id)
        .then(() => {
          res.status(SUCCESS_CODE).send({ message: SUCCESS_CODE_MESSAGE });
        });
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
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
        throw new NotFoundError({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS_CODE).send(card);
      }
    })
    .catch(next);
};

const deleteCardLike = (req, res, next) => {
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
        throw new NotFoundError({ message: ERROR_NOT_FOUND_CARD_MESSAGE });
      } else {
        res.status(SUCCESS_CODE).send(card);
      }
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  getCardById,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
