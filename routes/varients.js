const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");

// Import the controller functions
const {
  getAllVariants,
  getVariantById,
  createVariant,
  updateVariantById,
  deleteVariantById,
} = require("../controllers/varients.js");

router.route("/").get(getAllVariants);

router.route("/:variantId").get(getVariantById);

router.route("/createvar").post(authMiddleware, createVariant);

router.route("/:variantId").put(updateVariantById);

router.route("/:variantId").delete(deleteVariantById);

module.exports = router;
