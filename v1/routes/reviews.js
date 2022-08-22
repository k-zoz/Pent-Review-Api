const express = require("express");
// const cache = apicache.middleware;

const router = express.Router();

const {
  getAllReview,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../../controllers/review");

// router.get("/", cache("5 minutes"), getAllReview);
router.get("/", getAllReview);
router.get("/:id", getReview);
router.post("/", createReview);
router.delete("/:id", deleteReview);
router.patch("/:id", updateReview);

module.exports = router;
