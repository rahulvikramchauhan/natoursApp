const AppError = require("../utils/AppError");




const handleCastError=function(err){
  let message=`invalid value: ${err.value} at path ${err.path}`;
  return new AppError(404,message);
}
const handleValidationError=function(err){
  let errArr=Object.keys(err.errors);
  let message=errArr.map(function(el){
    return `${err.errors[el].message} at path ${err.errors[el].path}`
  })

  return new AppError(404,message);
}
const handleDuplicateKey=function(err){
  const message=`duplicate value at path ${Object.keys(err?.keyValue).join(",")}`;
  return new AppError(404,message)
}
const sendErrorDev=function(err,res){
  // console.log(err.stack);
  

    err.statusCode=err.statusCode|| 500;
    err.status=err.status|| "error";
  
    res.status(err.statusCode).send({
      status:err.status,
      error:err,
      message:err.message,
      stack: err.stack
    })
}
const sendErrorProd=function(err,res){
  // console.log(err.stack);
  
  if(err.isOperational){
    

      err.statusCode=err.statusCode|| 500;
    err.status=err.status|| "error";
  
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message,
      
    }) 

  } 
  else{
    
    err.statusCode=err.statusCode|| 500;
    err.status=err.status|| "error";
  
    res.status(err.statusCode).json({
      status:"error",
      message:"something went wrong",
      
    })
  }
  
    
}
module.exports=function(err,req,res,next){
  console.log("next err method called")
  
  if(process.env.NODE_ENV=="development"){
    
    console.log("dev error")
    
    sendErrorDev(err,res);
  }else if(process.env.NODE_ENV=="production"){
    // let error={ ...err };
    
    // console.log(error)
    // console.log(err.message)
    // console.log(err.name);
   
    if(err.name=="CastError") err= handleCastError(err);
  
    if(err.name=="ValidationError") err=handleValidationError(err);
    if(err.code==11000) err=handleDuplicateKey(err);
    
    sendErrorProd(err,res);
  }
    
  }