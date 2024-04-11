const User=require("../Database/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {token,passwordCompare}=require('../utils/functionality');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")





exports.signUp=catchAsync(async function(req,res,next){
    
    
        const userData=await User.create(req.body);
       
        const includeUserData = JSON.parse(JSON.stringify(userData));//if we do with ={...userData} it copies extra properties(Non-serialize data) of userData 

        // console.log(userData);
        // console.log(includeUserData);

        delete includeUserData.password;
        
        console.log("deconstruted data")


        

    res.status(201).json({
        status:"pass",
        token:token(userData._id),
        data: includeUserData,
       

    })
    // `${error.errors.kind} to provide ${error.errors.path}`
});
exports.login=catchAsync(async function(req,res,next){
    const{email,password}=req.body;
    if(!email || !password){
        const message="email or password is not present"
        return next(new AppError(404,message))
    }
    const user=await User.findOne({email});

    // await user.correctpassword(password,user.password
//    console.log(await passwordCompare(password,user.password))
    // const passwordCheck=await passwordCompare(password,user.password) ;
    
    if(!user||!( await passwordCompare(password,user.password) )){
        console.log("password compare fail");
        const message="password or user does not exist";
        return next(new AppError(404,message));

    }
    
    res.status(201).json({token:token(user._id)});
});
exports.protectRoute=catchAsync(async function(req,res,next){
    const token=req.headers.authorization.split(" ")[1];
    const verify=await jwt.verify(token,process.env.JWT_SECRET_KEY);
    console.log(token);
    console.log(verify);
    next();
    // next();
})
