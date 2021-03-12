const ApiError = require('./ApiError.js');

class Unautorized extends ApiError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = Unautorized;
