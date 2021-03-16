const ApiError = require('./ApiError.js');

class NotFound extends ApiError {
  constructor(message) {
    super(404, message);
  }
}

module.exports = NotFound;
