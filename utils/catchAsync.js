module.exports=function(fn){
    // console.log(req)
 
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}