const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, "Please provide the location of the apartment"],
      minlength: 2,
    },

    landlord: {
      type: String,
      required: [true, "Please provide information about the landlord"],
      minlength: 2,
    },

    enviroment: {
      type: String,
      required: [true, "Please provide information about the enviroment"],
      minlength: 2,
    },

    amenities: {
      type: String,
      required: [
        true,
        "Please provide information about the amenities in the apartment",
      ],
    },

    rating: {
      type: Number,
      required: [true, "Please provide a rating for this apartment"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
