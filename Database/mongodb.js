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
    validate:{
      validator:function(val){
       
        return val>0?true:false;
      },
      message:"duration {VALUE} must greater than 0"
    }
  },
  difficulty:{
    type:String,
  },
  ratingsAverage:{
    type:Number,
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
