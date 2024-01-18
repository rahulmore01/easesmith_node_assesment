const mongoose = require("mongoose");
const { Schema } = mongoose;
const ModelFeatures = require("../utils/ModelFeatures");

const variantSchema = new Schema(
  {
    size: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", variantSchema);
