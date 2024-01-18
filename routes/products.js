const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authentication");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/products.js");

router.route("/").get(getAllProducts);

router.route("/:productId").get(getProductById);

router.route("/createproduct").post(authMiddleware, createProduct);

router
  .route("/updateproductbyid/:productId")
  .put(authMiddleware, updateProductById);

router
  .route("/deleteproductbyid/:productId")
  .delete(authMiddleware, deleteProductById);

module.exports = router;
