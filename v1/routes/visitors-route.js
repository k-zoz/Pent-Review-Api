const express = require("express");
const router = express.Router();

const { getAllReviews } = require("../../controllers/visitors-reviews");

router.get("/", getAllReviews);

module.exports = router;
