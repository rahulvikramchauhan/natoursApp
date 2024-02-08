const fs = require("fs");
let tour = JSON.parse(
  fs.readFileSync("./4-natours/starter/dev-data/data/tours-simple.json")
);
exports.checkId = function (req, res, next, val) {
  if (val * 1 > tour.length) {
    return res.status(400).json({
      status: "failed",
      message: "can't find id",
    });
  }
  next();
};
exports.checkTour = function (req, res, next) {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({
      status: "bad request",
      message: "name and price not found",
    });
  }
  next();
};

exports.getAllTours = function (req, res) {
  console.log(req.exactTime);
  res.status(200).json({ status: "success", result: tour.length, data: tour });
};
exports.getTour = function (req, res) {
  const id = req.params.id * 1;
  tour = tour.filter(function (el) {
    return el.id == id;
  });
  res.status(200).json({ status: "success", data: tour });
};
exports.createNewTour = function (req, res) {
  console.log(req.body);
  const newId = tour[tour.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tour.push(newTour);
  fs.writeFile(
    "./4-natours/starter/dev-data/data/tours-simple.json",
    JSON.stringify(tour),
    function (err) {
      res.status(201).json({ status: "success", data: newTour });
    }
  );
  // res.end();
};
exports.updateTour = function (req, res) {
  // console.log(req.body);
  tour = tour.map(function (el) {
    if (el.id === req.params.id * 1) {
      el.name = req.body.name;
    }
    return el;
  });
  fs.writeFile("./rahul/rahul.txt", JSON.stringify(tour), function (err) {
    if (err) {
      res.status(401).json({ status: "failed", data: err });
    } else {
      res.status(200).json({ status: "source updated", data: req.body });
    }
  });
};
