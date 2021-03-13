const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(30),
    image: Joi.string().required(),
    trailer: Joi.string().required(),
    thumbnail: Joi.string().required(),

  }),
}), createMovie);

router.delete('/movies/:id', deleteMovie);

module.exports = router;
