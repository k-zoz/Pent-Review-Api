const Review = require("../models/Review");
const { BadRequest, NotFound } = require("../errors");
const { StatusCodes } = require("http-status-codes");

// registered user gets all the reviews
const getAllReview = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

//registered users can get a particular review
const getReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOne({ _id: reviewID });
  if (!review) {
    throw new NotFound(`Can't find review with id ${reviewID}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

//user can create a review
const createReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

//user needs to update the details  of a review made
const updateReview = async (req, res) => {
  const {
    body: { location, landlord, enviroment, amenities, rating },
    params: { id: reviewID },
  } = req;

  if (
    location === " " ||
    landlord === " " ||
    enviroment === " " ||
    amenities === " " ||
    rating === " "
  ) {
    throw new BadRequest(
      "Location, landlord, enviroment, amenities, rating  fields cannot be empty"
    );
  }

  const review = await Review.findOneAndUpdate({ _id: reviewID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    throw new NotFound(`Can't find review with id ${reviewID}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

//user needs to delete a review made
const deleteReview = async (req, res) => {
  const { id: reviewID } = req.params;
  const review = await Review.findOneAndDelete({ _id: reviewID });
  if (!review) {
    throw new NotFound(`Can't find review with id ${reviewID}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllReview,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
