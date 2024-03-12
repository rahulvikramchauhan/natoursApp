const fs = require("fs");
const tours=require("../Database/mongodb");
const tourData=JSON.parse(fs.readFileSync("./Data/tours-simple.json","utf-8"))
const ApiFeatures=require("../utils/apiFeatures");



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
exports.getbesttour=async function(req,res,next){
  req.query.sort="price -ratingsAverage";
  req.query.limit='5';
  req.query.feilds="name duration price ratingsAverage";
  next();
}

exports.getAllTours = async function (req, res) {
  try {

  // // A) BUILD QUERY
  // // A1)FILTERRING
  // console.log(req.query)
  // let queryObj={...req.query};
  // const exculdeFilter=["sort","limit","page","feilds"];
  // exculdeFilter.forEach(function(el){
  //   delete queryObj[el];
  // })
  // // let query=tours.find().where("duration").equals(4).where("ratingsAverage").equals("4.4");

  // // A2)ADVANCE FILTERRING

  // let queryString=JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g,function(matchValue){
  //   return `$${matchValue}`
  // })
  // queryObj=JSON.parse(queryString);
  // console.log(queryObj);

  // let query=tours.find(queryObj);
  // A3) SORTING
  // if(req.query.sort){
  //   query=query.sort(req.query.sort)
  // }

  // // A4)PAGINATION
  // let limit=req.query.limit*1||100;
  // let skip=req.query.page*1||1
  // let toSkip=(skip-1)*(limit);
  // query.skip(toSkip).limit(limit) ;

  // if(req.query.page){
  //   let countDocument=await tours.countDocuments();
  //   if(toskip>countDocument){
  //     throw new Error("page not found")
  //   } 

  // }

 

  // // A5)PROJECTION
  // if(req.query.feilds){
  //   let feilds=req.query.feilds.split(",").join(" ");
  //   query.select(feilds)
  // }

  

  // B) EXECUTE QUERY
  let features=new ApiFeatures(tours.find(),req.query);
  
  features.filter().sort().feilds().pagination();
  // console.log(features.moongooseQuery)
  
  let query=await features.moongooseQuery;
  
  
  res.status(200).json({ status: "success",results:query.length,data:query });
  } catch (error) {
    res.status(404).json({status:"fail",message:error})
  }
  
};
exports.getTour =async function (req, res) {
  const id = req.params.id ;
  console.log(req.params);
  tour = await tours.find(req.params);
  res.status(200).json({ status: "success", data: tour });
};

exports.createNewTour = async function (req, res) {
  try{
    const newTour=await tours.create(tourData);
    
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
exports.getMonthlyStas=async function(req,res){
  try {
    const year=req.params.year||2020;
    const date=new Date(Date.now());
    const query=await tours.aggregate([
      {
        $addFields:{welcome:"home"}
      }
      // {
      //   $unwind:{
      //     path:"$startDates"
      //   }
      // },
      // {
      //   $match:{
      //     "startDates":{
      //       $gte:new Date(`${year}-01-01`),
      //       $lte:new Date(`${year}-12-31`)
      //     },
      //   }
      // },
      // {
      //   $group:{
      //     _id:{$month:"$startDates"},
      //     total_Count: { $sum: 1 }, // Count the number of documents
      //     avg_price: { $avg: "$price" },
      //     tour:{$push:"$name"},
      //     max_price:{$max:"$price"},
      //     min_price:{$min:"$price"}

      //     // round_avg_price: { $round: ["$avg_price", 2] }
      //        }
      // },{
      //   $addFields:
      //   {createdDates:date.toLocaleString()}
      // }
      
    ])
    res.status(200).json({ status: "success",results:query.length,data:query });
  } catch (error) {
    res.status(404).json({status:"fail",message:error})
  }
}
