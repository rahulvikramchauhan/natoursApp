const fs = require("fs");
const tour=require("../Database/mongodb");

// exports.checkId = function (req, res, next, val) {
//   if (val * 1 > tour.length) {
//     return res.status(400).json({
//       status: "failed",
//       message: "can't find id",
//     });
//   }
//   next();
// };
// exports.checkTour = function (req, res, next) {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).send({
//       status: "bad request",
//       message: "name and price not found",
//     });
//   }
//   next();
// };

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

exports.createNewTour = async function (req, res) {
  try{
    const newTour=await tour.create(req.body);
 res.status(200).json({status:"success",
data:newTour});
  }catch(err){
    res.status(400).json({status:"fail",message:"bad request"});
  }
  
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
