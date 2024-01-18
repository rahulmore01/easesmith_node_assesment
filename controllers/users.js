const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ModelFeatures = require("../utils/ModelFeatures");

const getAllUsers = async (req, res, next) => {
  try {
    const baseQuery = User.find();

    const users = await new ModelFeatures(baseQuery, req.query)
      .filter()
      .search()
      .paginate()
      .sort()
      .query.exec();

    res.json(users);
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, phone, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      role,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    console.log("User created:", savedUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }

    // Create a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  const userId = req.params.userId;

  const { name, phone, email, password, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, email, password, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  console.log("req.params.id", req.params.userId);
  const userId = req.params.userId;

  try {
    const userFromDB = await User.findById(userId);
    console.log("first", userFromDB);

    if (!userFromDB) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the authenticated user has the same ID as the user being deleted
    console.log("req.userData", req.userData);

    if (userId === userFromDB._id.toString()) {
      // User can delete this account

      const deletedUser = await User.findByIdAndDelete(userId);
      return res.status(200).json({
        message: "User deleted successfully",
        deletedUser,
      });
    } else {
      const unauthorizedError = new Error(
        "You don't have access to delete this user"
      );
      unauthorizedError.statusCode = 401;
      throw unauthorizedError;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUserById,
  deleteUserById,
};
