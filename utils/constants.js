const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICT = 409;
const ERROR_DEFAULT = 500;
const SUCCESS_CODE_MESSAGE = 'Карточка успешно удалена';
const CREATED_CODE_MESSAGE = 'Пользователь создан';
const ERROR_BAD_REQUEST_MESSAGE = 'Некорректные данные';
const ERROR_UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const ERROR_UNAUTHORIZED_WRONG_MESSAGE = 'Неправильные почта или пароль';
const ERROR_FORBIDDEN_MESSAGE = 'Удаление чужой карточки запрещено';
const ERROR_NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден';
const ERROR_NOT_FOUND_CARD_MESSAGE = 'Карточка с указанным _id не найдена';
const ERROR_CONFLICT_MESSAGE = 'Пользователь уже существует';
const ERROR_DEFAULT_MESSAGE = 'На сервере произошла ошибка';
const urlRegex = /^(https:|http:|www\.)\S*/;

module.exports = {
  SUCCESS_CODE,
  CREATED_CODE,
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_DEFAULT,
  SUCCESS_CODE_MESSAGE,
  CREATED_CODE_MESSAGE,
  ERROR_BAD_REQUEST_MESSAGE,
  ERROR_UNAUTHORIZED_MESSAGE,
  ERROR_UNAUTHORIZED_WRONG_MESSAGE,
  ERROR_FORBIDDEN_MESSAGE,
  ERROR_NOT_FOUND_USER_MESSAGE,
  ERROR_NOT_FOUND_CARD_MESSAGE,
  ERROR_CONFLICT_MESSAGE,
  ERROR_DEFAULT_MESSAGE,
  urlRegex,
};
