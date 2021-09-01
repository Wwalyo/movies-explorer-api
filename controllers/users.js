const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound.js');
const Forbidden = require('../errors/Forbidden.js');
const Unautorized = require('../errors/Unautorized.js');
const BadRequest = require('../errors/BadRequest.js');

const { JWT_SECRET = 'dev_jwt' } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Forbidden('Неправильный логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            return user;
          }
          throw new Forbidden('Неправильный логин или пароль');
        });
    })
    .then(({ _id }) => {
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    }))
    .then((user) => {
      const id = user._id;
      const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).send({
        _id: id,
        email: user.email,
        token: token
      });
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Unautorized('Не авторизован');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      /* eslint-disable-next-line no-console */
      console.log(err);
      throw err;
    })
    .catch(next);
};

module.exports.patchProfile = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequest();
  }
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .orFail(() => {
      throw new NotFound('Профиль не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};
