const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");
const Review = require("../models/Review");

const updateRatingReview = async (req, res) => {
  const {
    body: { rating },
    params: { id: reviewID },
  } = req;

  if (rating === " ") {
    throw new BadRequest("Please provide a rating for this apartment reviewed");
  }

  const review = await Review.findOneAndUpdate({ _id: reviewID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    throw new BadRequest(`Can't find review with ${reviewID}`);
  }

  res.status(StatusCodes.OK).json({ review });
};

//
const getAllReviews = async (req, res) => {
  //destructured from the request query
  const { landlord, sort, fields, numericFilters } = req.query;
  //create a new object for filteing
  const allReviews = {};
  if (landlord) {
    allReviews.landlord = { $regex: landlord, $options: "i" };
  }
  //visitors can sort based on the rating of a review
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const reGex = /\b(<|<=|=|>|>=)\b/g;

    let filters = numericFilters.replace(
      reGex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        allReviews[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Review.find(allReviews);

  //sorting the reviews based on keywords
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
    //if the user doesn't provide a sort query, set a default query-createdAt
  } else {
    result = result.sort("createdAt");
  }

  //select certain fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  //to get the page, as page comes in a string, ensure it's switched to number, if the user doesn't select a number set default to 1

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const review = await result;
  res.status(200).json({ review, numOfHits: review.length });
};

module.exports = { getAllReviews, updateRatingReview };
