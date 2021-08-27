require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const usersRoutes = require('./routes/users.js');
const moviesRoutes = require('./routes/movies.js');
const { login, createUser } = require('./controllers/users.js');
const errorProcessing = require('./middlewares/errorProcessing.js');
const limiter = require('./middlewares/limiter.js');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const NotFound = require('./errors/NotFound.js');

const { PORT = 3001, MONGO_ADDRESS = 'mongodb://localhost:27017/moviedb' } = process.env;

const app = express();

mongoose.connect(MONGO_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);

app.use((req, res, next) => {
  /* eslint-disable-next-line no-console */
  console.log(req.method, req.path);
  next();
});

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use('/users', auth);
app.use('/movies', auth);
app.use('/', usersRoutes);
app.use('/', moviesRoutes);

app.use(errorLogger);

app.use('/', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorProcessing);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`App listening port: ${PORT}`);
});
