const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const AppError=require("./utils/AppError")
const globalErrorHandler=require("./Controllers/errorHandler")
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
app.use(express.static(`${__dirname}/4-natours/starter/public/`));

app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);

// this line of code is used for error handling if path did not match with "/api/v1/tours"or "/api/v1/users"
// applicable for req type
app.all("*",function(req,res,next){ 
  // const err= new Error(`can't get ${req.originalUrl} in server`);
  
  // err.statusCode=404;
  // err.status="fail";
  // console.log(err);
  // next(err);

  next(new AppError(404,`can't get ${req.originalUrl} in server`))
});
app.use(globalErrorHandler)

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.put("/api/v1/tours", createNewTour);
// app.patch("/api/v1/tours/:id", updateTour);

//SERVER

module.exports = app;
