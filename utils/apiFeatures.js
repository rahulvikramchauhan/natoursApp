class ApiFeatures{
    constructor(moongooseQuery,expressQuery){
      // moongooseQuery=tours.find
      this.moongooseQuery=moongooseQuery;
      this.expressQuery=expressQuery;
    }
   filter(){
      let queryObj={...this.expressQuery};
      
    const exculdeFilter=["sort","limit","page","feilds"];
    exculdeFilter.forEach(function(el){
      delete queryObj[el];
    })
    // let query=tours.find().where("duration").equals(4).where("ratingsAverage").equals("4.4");
  
    // A2)ADVANCE FILTERRING
  
    let queryString=JSON.stringify(queryObj).replace(/\b(gte|gt|lte|lt)\b/g,function(matchValue){
      return `$${matchValue}`
    })
    queryObj=JSON.parse(queryString);
    console.log(queryObj);
  
    this.moongooseQuery=this.moongooseQuery.find(queryObj);
      return this;
    }
    sort(){
      
      if(this.expressQuery.sort){
        this.moongooseQuery=this.moongooseQuery.sort(this.expressQuery.sort)
      }
      return this;
    }
    pagination(){
      let limit=this.expressQuery.limit*1||100;
      let skip=this.expressQuery.page*1||1
      let toSkip=(skip-1)*(limit);
      this.moongooseQuery.skip(toSkip).limit(limit) ;
      return this;
    }
    feilds(){
      if(this.expressQuery.feilds){
        let feilds=this.expressQuery.feilds.split(",").join(" ");
        this.moongooseQuery.select(feilds);
      }
      return this;
    }
  }
module.exports=ApiFeatures;