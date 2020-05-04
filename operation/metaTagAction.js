var metaTagActionDb  = require("../modal/metaTags");

module.exports.storeMetaTag=function(req,res){
    var metatagregist = new metaTagActionDb(req.body)
    metatagregist.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}

module.exports.get_AddMetaTags =function(req,res){
  metaTagActionDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Meta Tags doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Meta Tags are displayed successfully.","data": data})

        }
 })
}

module.exports.edit_AddMetaTags=function(req,res){
  metaTagActionDb.updateOne({_id: req.body.metaTagId},{page:req.body.page,title:req.body.title,metaTags:req.body.metaTags}).exec((err,data)=>{
    if(err){
      res.send({"responseCode":400,"responseMessage":"Some error please try after some time"})
    } else{
      res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
    }
  })
}

module.exports.delete_addMetaTags=function(req,res){
  metaTagActionDb.deleteOne({_id:req.body.metaTagId}).exec((err,data)=>{
        if(err){
            res.send({"responseCode":400,"responseMessage":"Error."})
        } else{
            res.send({"responseCode":200,"responseMessage":"MetaTag successfully deleted."})
        }
    })
}

module.exports.get_meta_tag=function(req,res){
  metaTagActionDb.find({page:req.params.page}).exec(function(err,data){
      if(err){
          res.send({"responseCode":400,"responseMessage":"Meta tags doesn't exist."})
      } else{
          res.send({"responseCode":200,"responseMessage":"Meta tags are displayed successfully.","data": data})

      }
})
}

// module.exports.search_addGuide =function(req,res){
//    guidesActionDb.find({cityName : { $regex: req.body.srch_guide , $options: '$i' } }).exec(function(err,succ){
//        if(err){
//           res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
//        } else {
//            res.send({"responseCode":200,"responseMessage":"Guide successfully found.",data: succ})
//        }
//    })
// }
