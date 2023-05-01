const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const validationRules = require('../utils/validationRules');

const {
  createCard,
  getCards,
  getCardById,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const { urlRegex } = require('../utils/constants');

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: validationRules.name,
    link: validationRules.link,
  }),
}), createCard); // создаёт карточку

cardsRouter.get('/', getCards); // возвращает все карточки

cardsRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: validationRules.id,
  }),
}), getCardById); // возвращает карточку по _id

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: validationRules.id,
  }),
}), deleteCard); // удаляет карточку по _id

cardsRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: validationRules.id,
  }),
}), addCardLike); // поставить лайк карточке

cardsRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: validationRules.id,
  }),
}), deleteCardLike); // убрать лайк с карточки

module.exports = cardsRouter;
