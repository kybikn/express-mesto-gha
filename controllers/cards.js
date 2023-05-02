const Card = require('../models/cards');
const {
  SUCCESS_CODE,
  CREATED_CODE,
  SUCCESS_MESSAGE,
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
      res.status(CREATED_CODE).send(populatedCard);
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
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
        throw new NotFoundError(ERROR_NOT_FOUND_CARD_MESSAGE);
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
        throw new NotFoundError(ERROR_NOT_FOUND_CARD_MESSAGE);
      }
      if (card.owner._id.toString() !== userId) {
        throw new ForbiddenError(ERROR_FORBIDDEN_MESSAGE);
      }
      card.deleteOne()
        .then(() => {
          res.status(SUCCESS_CODE).send({ message: SUCCESS_MESSAGE });
        })
        .catch(next);
    })
    .catch(next);
};

const editCardLike = (action, req, res, next) => {
  const cardId = req.params.id;
  const userId = req.user._id;
  const mongooseAction = action === 'add' ? '$addToSet' : '$pull';
  Card.findByIdAndUpdate(
    cardId,
    { [mongooseAction]: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_NOT_FOUND_CARD_MESSAGE);
      } else {
        res.status(SUCCESS_CODE).send(card);
      }
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
  const action = 'add';
  editCardLike(action, req, res, next);
};

const deleteCardLike = (req, res, next) => {
  const action = 'delete';
  editCardLike(action, req, res, next);
};

module.exports = {
  createCard,
  getCards,
  getCardById,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
