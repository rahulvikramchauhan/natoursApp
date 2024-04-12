const express = require("express");
const auth=require("../Controllers/authenticationHandler");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

const getAllUser =catchAsync(async function (req, res) {
  res.status(500).json({
    status: "failed",
    message: "internal server error",
  });
});
const getUser =catchAsync(async function (req, res) {
  res.status(500).json({
    status: "failed",
    message: "internal server error",
  });
});
const updateUser =catchAsync(async function (req, res) {
  res.status(500).json({
    status: "failed",
    message: "internal server error",
  });
});
const createUser =catchAsync(async function (req, res) {
  res.status(500).json({
    status: "failed",
    message: "internal server error",
  });
});
router.post("/signUp",auth.signUp)
router.post("/login",auth.login);

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser);

module.exports = router;
