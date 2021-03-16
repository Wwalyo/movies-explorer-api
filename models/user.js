const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return /[\s\wа-яёА-ЯЁ\-]{2,30}/.test(v);
      },
      message: (props) => `${props.value} Некорректное имя!`,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} Некорректный email!`,
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
    validate: {
      validator(v) {
        return /[\w]+/.test(v);
      },
      message: (props) => `${props.value} Некорректный email!`,
    },

  },
});

module.exports = mongoose.model('user', userSchema);
