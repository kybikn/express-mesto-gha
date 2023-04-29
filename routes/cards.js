const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
    name: Joi.string().required().min(2).max(40),
    link: Joi.string().required().min(2).max(500)
      .pattern(urlRegex),
  }),
}), createCard); // создаёт карточку

cardsRouter.get('/', getCards); // возвращает все карточки

cardsRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getCardById); // возвращает карточку по _id

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteCard); // удаляет карточку по _id

cardsRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), addCardLike); // поставить лайк карточке

cardsRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteCardLike); // убрать лайк с карточки

module.exports = cardsRouter;
