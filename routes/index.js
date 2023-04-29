const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const {
  ERROR_NOT_FOUND_PAGE_MESSAGE,
} = require('../utils/constants');

router.use(authRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use((req, res, next) => {
  const err = new NotFoundError(ERROR_NOT_FOUND_PAGE_MESSAGE);
  next(err);
});

module.exports = router;
