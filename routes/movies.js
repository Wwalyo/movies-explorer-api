const router = require('express').Router();
const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovie);

router.delete('/movies/:id', deleteMovie);

module.exports = router;
