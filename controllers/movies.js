const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound.js');
const BadRequest = require('../errors/BadRequest.js');
const Forbidden = require('../errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => movie.populate('owner').execPopulate())
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new BadRequest('Передан некорректный идентификатор фильма');
  }
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Фильм по заданному id отсутствует');
    })
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id.toString()) {
        return Movie.deleteOne({ _id: req.params.id })
          .orFail(() => {
            throw new NotFound('Фильм по заданному id отсутствует');
          })
          .then((item) => res.send(item));
      }
      return new Forbidden('Можно удалять только свои фильмы');
    })
    .catch(next);
};
