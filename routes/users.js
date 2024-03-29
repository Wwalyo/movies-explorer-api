const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getProfile, patchProfile,
} = require('../controllers/users');

router.get('/users/me', getProfile);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email({ tlds: { allow: false } }),
  }),
}), patchProfile);

module.exports = router;
