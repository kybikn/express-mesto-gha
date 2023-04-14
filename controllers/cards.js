const Card = require('../models/cards');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => card.populate('owner'))
    .then((populatedCard) => res.send(populatedCard))
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getCardId = (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    // .orFail(() => {
    //   const error = new Error('карточка не найдена');
    //   throw error;
    // })
    .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    // .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const addCardLike = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    // .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const deleteCardLike = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    // req.params.cardId,
    id,
    { $pull: { likes: id } }, // убрать _id из массива
    { new: true }
  )
    // .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports = {
  createCard,
  getCards,
  getCardId,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
