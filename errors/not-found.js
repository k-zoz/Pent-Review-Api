const CustomAPIEror = require("./CustomAPIError");
const { StatusCodes } = require("http-status-codes");

class NotFound extends CustomAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;
