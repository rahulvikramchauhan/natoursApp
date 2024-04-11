const express = require("express");
const router = express.Router();

const getAllUser = function (req, res) {
  res.status(500).send({
    status: "failed",
    message: "internal server error",
  });
};
const getUser = function (req, res) {
  res.status(500).send({
    status: "failed",
    message: "internal server error",
  });
};
const updateUser = function (req, res) {
  res.status(500).send({
    status: "failed",
    message: "internal server error",
  });
};
const createUser = function (req, res) {
  res.status(500).send({
    status: "failed",
    message: "internal server error",
  });
};

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getUser).patch(updateUser);

module.exports = router;
