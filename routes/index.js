const router = require('express').Router();

const authRouter = require('./auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');

router.use(authRouter);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
  next();
});

module.exports = router;
