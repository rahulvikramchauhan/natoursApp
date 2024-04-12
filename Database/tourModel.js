const mongoose = require("mongoose");

console.log("schema called")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true,"required fname"],
  },
  duration: {
    type: Number,
    validate:{
      validator:function(val){
       
        return val>0?true:false;
      },
      message:"duration {VALUE} must greater than 0"
    }
  },
  difficulty:{
    type:String,
    enum:{
    values:["easy","difficult","medium"],
    message:" Difficulty is either: easy, medium, difficult"
    }

    
  },
  ratingsAverage:{
    type:Number,
    default:4.5,
    validate:{
      validator: function(val){
        return val<5 && val>0
      },
      message:"rating avg {VALUE} must less than 5 and greater than 0"
    }
  },
  ratingQuantity:{
    type:Number,
    default:0,
  },
  price:{
    type:Number,
    unique:true
  },
  summary:{
    type:String,
    trim:true,
    unique:true,
    required:[true,"A tour must have summary"]
  },
  description:{
    type:String,
    trim:true,
  },
  imageCover:{
    type:String,
    required:[true,"tour must have image cover"]
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now,
    select:false
  },
  startDates:[Date]
},{
  toJSON:{virtuals:false,transform: function(doc, ret) {
    // Remove the duplicate _id field
    delete ret.id;
  }},
  toObject:{virtuals:false,transform: function(doc, ret) {
    // Remove the duplicate _id field
    delete ret.id;
  }},
  
});

userSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
})

const Tours = mongoose.model("tours", userSchema);

module.exports=Tours;
