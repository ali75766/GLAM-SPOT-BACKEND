const express = require("express");
const { uploadImages } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, upload.array("images", 3), uploadImages);

module.exports = router;
