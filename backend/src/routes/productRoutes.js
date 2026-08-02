const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  applyProductDiscount,
  applyDiscountToAllProducts
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.patch("/discounts/bulk", protect, adminOnly, applyDiscountToAllProducts);
router.get("/:id", getProductById);
router.patch("/:id/discount", protect, adminOnly, applyProductDiscount);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
