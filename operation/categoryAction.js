var category = require("../modal/category");
module.exports.addCategory=function(req,res){
    if(!req.body.category)
    res.send({responseCode:400,responseMessage:"Please provide the category"})
    else {
        detail=new category({
            category:req.body.category
        }).save((err,result)=>{
   if(err)
   res.send({responseCode:400,responseMessage:"Something went wrong"})
   if(!result)
   res.send({responseCode:201,responseMessage:"category not save"})
   else if(result)
   res.send({responseCode:200,responseMessage:"Category Saved Successfully",result})
        })  
    }
}
module.exports.getCategory=function(req,res){
    category.find({},(err,succ)=>{
        if(err)
        res.send({responseCode:400,responseMessage:"Something went wrong"})
        if(!succ)
   res.send({responseCode:201,responseMessage:"category not found"})
   else if(succ)
   res.send({responseCode:200,responseMessage:"Category Saved Successfully",succ})
    })
}
module.exports.deleteCategory=function(req,res){
    category.findByIdAndDelete({_id:req.body.id},(err,succ)=>{
        if(err)
        res.send({responseCode:400,responseMessage:"Something went wrong"})
        if(!succ)
   res.send({responseCode:201,responseMessage:"category not found"})
   else if(succ)
   res.send({responseCode:200,responseMessage:"Category Deleted Successfully",succ})
    })
}










