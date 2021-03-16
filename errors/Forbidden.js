const ApiError = require('./ApiError.js');

class Forbidden extends ApiError {
  constructor(message) {
    super(403, message);
  }
}

module.exports = Forbidden;
