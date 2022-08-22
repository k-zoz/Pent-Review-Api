const CustomAPIEror = require("./CustomAPIError");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomAPIEror {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
