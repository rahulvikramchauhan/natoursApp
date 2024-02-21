const fs = require("fs");
const tours=require("../Database/mongodb");
const tourData=JSON.parse(fs.readFileSync("./Data/tours-simple.json","utf-8"))

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

exports.getAllTours = async function (req, res) {
  console.log(req.query);
  const queryObj={...req.query};
  let query=tours.find({});
  query=query.sort(req.query.sort)
  query=await query;
  
  
  res.status(200).json({ status: "success",data:query });
};
exports.getTour = function (req, res) {
  // const id = req.params.id * 1;
  // tour = tour.filter(function (el) {
  //   return el.id == id;
  // });
  res.status(200).json({ status: "success", data: tour });
};

exports.createNewTour = async function (req, res) {
  try{
    console.log(typeof tourData[0].name);
    const newTour=await tours.insertMany(tourData);;
 res.status(200).json({status:"success",
data:newTour});
  }catch(err){
    res.status(400).json({status:"fail",message:err});
  }
  
  // res.end();
};
exports.updateTour =async function (req, res) {
  // console.log(req.body);
  try{
    const tour= await tours.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
    });
    res.status(200).json({
      status:"pass",
      data:tour
    })

  }catch(err){
    res.status(400).json({status:"fail",message:err});
  }
};
exports.deleteTourbyId=async function(req,res){
  try {
    const tour=await tours.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status:"pass",
      data:tour
    });
  } catch (error) {
    res.status(400).json({status:"fail",message:error});
  }
}
