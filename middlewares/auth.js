const jwt = require('jsonwebtoken');
const Unautorized = require('../errors/Unautorized');

const { JWT_SECRET = 'dev_jwt' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unautorized('Не авторизован');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unautorized('Не авторизован');
  }
  req.user = payload;
  next();
};

module.exports = auth;
