const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

exports.token=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"}) 
}
exports.passwordCompare=async function(providedPassword,savedPassword){
    console.log("brt called")
    return await bcrypt.compare(providedPassword,savedPassword)
}