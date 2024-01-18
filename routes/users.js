const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  loginUser,
} = require("../controllers/users");

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/allusers").get(authMiddleware, getAllUsers);

router.route("/:userId").get(authMiddleware, getUserById);

router.route("/:userId").put(authMiddleware, updateUserById);

router.route("/:userId").delete(authMiddleware, deleteUserById);

module.exports = router;
