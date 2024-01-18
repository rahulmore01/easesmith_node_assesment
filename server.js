const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware.js");
const User = require("./models/userModel");
require("dotenv").config();
const connectDB = require("./utils/db.js");

const PORT = 8000;

const cors = require("cors");
app.use(cors());
app.use(errorHandlerMiddleware);

// to import our routes
const products_routes = require("./routes/products.js");
const users_routes = require("./routes/users.js");
const varients_routes = require("./routes/varients.js");

app.use("/api/products", products_routes);
app.use("/api/users", users_routes);
app.use("/api/varients", varients_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
