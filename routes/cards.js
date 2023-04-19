const cardsRouter = require('express').Router();
const {
  createCard,
  getCards,
  getCardById,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

cardsRouter.post('/', createCard); // создаёт карточку
cardsRouter.get('/', getCards); // возвращает все карточки
cardsRouter.get('/:id', getCardById); // возвращает карточку по _id
cardsRouter.delete('/:id', deleteCard); // удаляет карточку по _id
cardsRouter.put('/:id/likes', addCardLike); // поставить лайк карточке
cardsRouter.delete('/:id/likes', deleteCardLike); // убрать лайк с карточки

module.exports = cardsRouter;
