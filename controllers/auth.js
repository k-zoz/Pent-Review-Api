const User = require("../models/User");
const { BadRequest, Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Kindly provide name and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthenticated("Invalid credentials");
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const token = user.createJwt();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
