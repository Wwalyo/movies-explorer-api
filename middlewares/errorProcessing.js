const { isCelebrateError } = require('celebrate');
const ApiError = require('../errors/ApiError.js');

const errorProcessing = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).send({ message: err.message });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные', details: err.message });
  } else if (err.name === 'CastError') {
    res.status(400).send({ message: 'Передан неверный идентификатор', details: err.message });
  } else if (isCelebrateError) {
    res.status(400).send({ message: 'Переданы некорректные данные', details: err.message });
  } else {
    res.status(500).send({ message: 'Произошла ошибка', details: err.message });
  }
  next();
};

module.exports = errorProcessing;
