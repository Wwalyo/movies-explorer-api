const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getProfile, patchProfile,
} = require('../controllers/users');

router.get('/users/me', getProfile);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
}), patchProfile);

module.exports = router;
