const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Need to provide fname"],
    validate: {
      validator: function(v) {
        console.log(typeof v);
        return typeof v=='string';
      },
      message: props => `${props.value} is not a valid String!`
    }
    
  },
  duration: {
    type: Number,
  },
  difficulty:{
    type:String,
  },
  ratingsAverage:{
    type:String,
    default:4.5,
  },
  ratingQuantity:{
    type:Number,
    default:0,
  },
  price:{
    type:Number,
  },
  summary:{
    type:String,
    trim:true,
    required:[true,"A tour must have summary"]
  },
  discription:{
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
  },
  StartDate:[Date]
});

const Tours = mongoose.model("tours", userSchema);

module.exports=Tours;
