const Variant = require("../models/varientModel");

const getAllVariants = async (req, res, next) => {
  try {
    const variants = await Variant.find();
    res.json(variants);
  } catch (error) {
    next(error);
  }
};

const getVariantById = async (req, res, next) => {
  const variantId = req.params.variantId;

  try {
    const variant = await Variant.findById(variantId);

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.json(variant);
  } catch (error) {
    next(error);
  }
};

const createVariant = async (req, res, next) => {
  const { size, price } = req.body;

  try {
    const newVariant = new Variant({ size, price });
    const savedVariant = await newVariant.save();

    res.status(201).json(savedVariant);
  } catch (error) {
    next(error);
  }
};

const updateVariantById = async (req, res, next) => {
  const variantId = req.params.variantId;
  const { size, price } = req.body;

  try {
    const updatedVariant = await Variant.findByIdAndUpdate(
      variantId,
      { size, price },
      { new: true }
    );

    if (!updatedVariant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.json(updatedVariant);
  } catch (error) {
    next(error);
  }
};

const deleteVariantById = async (req, res, next) => {
  const variantId = req.params.variantId;

  try {
    const deletedVariant = await Variant.findByIdAndRemove(variantId);

    if (!deletedVariant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    res.json(deletedVariant);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVariants,
  getVariantById,
  createVariant,
  updateVariantById,
  deleteVariantById,
};
