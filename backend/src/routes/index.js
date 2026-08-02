const express = require("express");

const authRoutes = require("./authRoutes");
const bookingRoutes = require("./bookingRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");
const uploadRoutes = require("./uploadRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Glam Nail Studio API is running" });
});

router.use("/auth", authRoutes);
router.use("/bookings", bookingRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.use("/uploads", uploadRoutes);

module.exports = router;
