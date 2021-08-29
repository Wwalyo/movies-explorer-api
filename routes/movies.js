const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
    trailer: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
  }),
}), deleteMovie);

module.exports = router;
