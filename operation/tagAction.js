var tagDb = require("../modal/tag");

module.exports.add_tag=function(req,res){
    var tagregist = new tagDb(req.body)
    tagregist.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Tag successfully added."})
      }      
    })
}
module.exports.get_tag =function(req,res){
    tagDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Tag doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Tag lists are displayed successfully.","tagLists": data})
            
        }
 })
}

module.exports.delete_tag=function(req,res){
    tagDb.deleteOne({_id:req.body.tagId}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Tag successfully deleted."})
        }
    })
}