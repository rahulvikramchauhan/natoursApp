const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    unique: true,
    required: [true, "Need to provide fname"],
  },
  lastName: {
    type: "string",
  },
});

const Tours = mongoose.model("tours", userSchema);

exports.newTour = new Tours({
  firstName: "darcy",
  lastName: "vikram chauhan",
});
