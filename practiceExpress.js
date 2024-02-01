const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const tourRoute = require("./Routes/tourRoute");
const userRoute = require("./Routes/userRoute");
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

app.use(function (req, res, next) {
  req.exactTime = new Date().toISOString();
  console.log("welcome to middleware");
  next();
});

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.put("/api/v1/tours", createNewTour);
// app.patch("/api/v1/tours/:id", updateTour);

//SERVER

module.exports = app;
