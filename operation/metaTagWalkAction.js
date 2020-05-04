var metaTagWalkActionDb  = require("../modal/metaTagWalks");

// store meta tags
module.exports.storeWalkMetaTags=function(req,res){
    var metatagregist = new metaTagWalkActionDb(req.body)
    metatagregist.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}

// fetch the meta tags
module.exports.getAddMetaTags =function(req,res){
     //  .find({ $lookup:
    //     {
    //       from: 'walkdatas',
    //       localField: 'walk',
    //       foreignField: '_id',
    //       as: 'string'
    //     }
    //   })
    metaTagWalkActionDb.find().exec(function(err,data){
          if(err){
              res.send({"responseCode":400,"responseMessage":"Meta Tags doesn't exist."})
          } else{
              res.send({"responseCode":200,"responseMessage":"Meta Tags are displayed successfully.","data": data})
  
          }
   })
}

// delete
module.exports.delete_addWalkMetaTags=function(req,res){
    metaTagWalkActionDb.deleteOne({_id:req.body.metaTagId}).exec((err,data)=>{
          if(err){
              res.send({"responseCode":400,"responseMessage":"Error."})
          } else{
              res.send({"responseCode":200,"responseMessage":"MetaTag successfully deleted."})
          }
      })
}

//edit 
module.exports.edit_AddWalkMetaTags=function(req,res){
    metaTagWalkActionDb.updateOne({_id: req.body.metaTagId},{walk:req.body.walk,title:req.body.title,metaTags:req.body.metaTags}).exec((err,data)=>{
      if(err){
        res.send({"responseCode":400,"responseMessage":"Some error please try after some time"})
      } else{
        res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
      }
    })
}

// fetch for frontend
module.exports.get_walk_meta_tags=function(req,res){
  console.log('req.body------------->',req.body);
  metaTagWalkActionDb.find({walk:req.params.walk}).exec(function(err,data){
      if(err){
          res.send({"responseCode":400,"responseMessage":"Meta tags doesn't exist."})
      } else{
          res.send({"responseCode":200,"responseMessage":"Meta tags are displayed successfully.","data": data})

      }
  })
}