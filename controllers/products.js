const Product = require("../models/productModel");
const ModelFeatures = require("../utils/ModelFeatures");

const getAllProducts = async (req, res, next) => {
  try {
    const baseQuery = Product.find();

    const products = await new ModelFeatures(baseQuery, req.query)
      .filter()
      .search()
      .paginate()
      .sort()
      .query.exec();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  const { name, category, startPrice, sellerName } = req.body;

  try {
    const newProduct = new Product({ name, category, startPrice, sellerName });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  const productId = req.params.productId;

  const { name, category, startPrice, sellerName } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, category, startPrice, sellerName },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product deleted successfully",
      "Deleted Product": deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
