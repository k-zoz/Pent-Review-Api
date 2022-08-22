const BadRequest = require("./badRequest");
const CustomAPIError = require("./CustomAPIError");
const NotFound = require("./not-found");
const Unauthenticated = require("./unauthenticated");

module.exports = {
  BadRequest,
  CustomAPIError,
  NotFound,
  Unauthenticated,
};
