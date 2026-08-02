const express = require("express");
const {
  createBooking,
  getBookingById,
  getBookings
} = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createBooking);
router.get("/", protect, adminOnly, getBookings);
router.get("/:id", protect, adminOnly, getBookingById);

module.exports = router;
