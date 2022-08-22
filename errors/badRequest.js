const CustomAPIEror = require("./CustomAPIError");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends CustomAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
