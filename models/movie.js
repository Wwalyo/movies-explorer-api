const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[\wа-яё]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректное название!`,
    },
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[а-яё_]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректное название!`,
    },
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[\wа-яё]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректная запись!`,
    },
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[\wа-яё]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректная запись!`,
    },
  },
  duration: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        return /[\d\.]{1,}/.test(v);
      },
      message: (props) => `${props.value} Некорректная запись!`,
    },
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[\d\wа-яё]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректное название!`,
    },
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[\wа-яё]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректное название!`,
    },
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/\S+(?:jpg|jpeg|png)$/.test(v);
      },
      message: (props) => `${props.value} Некорректный url!`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/\S+(?:jpg|jpeg|png)$/.test(v);
      },
      message: (props) => `${props.value} Некорректный url!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/\S+(?:jpg|jpeg|png)$/.test(v);
      },
      message: (props) => `${props.value} Некорректный url!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    default: 1,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
