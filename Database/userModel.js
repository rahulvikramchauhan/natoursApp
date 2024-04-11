const moongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
console.log("user schema")

const userSchema=new moongoose.Schema({
    // name, email, password, passwordConfirm,image
    name:{
        type:String,
        required:[true, "please provide name"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "please provide email"],
        //validate works on save(during create user)
        validate:{
            validator:function(val){
                return validator.isEmail(val)
            },
            message:"please provide corrent email"
        }
    },
    password:{
        type:String,
        required:[true, "need to provide password"],
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:[true, "need to provide password"],
        minlength:8,
        validate:{
            validator:function(val){
                return this.password===val
            },
            message:"Password is not matching"
        }
    },
    image:String

},{validateBeforeSave:true});
userSchema.pre("save",async function(next){//Document Middleware
    if(!this.isModified('password')){
        return next();
    }
    
    this.password=await bcrypt.hash(this.password,12);
    
    this.passwordConfirm=undefined;
    next();


})
userSchema.methods.correctpassword = async function(currentpassword, userPassword) {
    return await bcrypt.compare(currentpassword, userPassword);
};
 module.exports=moongoose.model("User",userSchema)