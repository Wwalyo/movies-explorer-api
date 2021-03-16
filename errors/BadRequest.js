const ApiError = require('./ApiError.js');

class BadRequest extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

module.exports = BadRequest;
