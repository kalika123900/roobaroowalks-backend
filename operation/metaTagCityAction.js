var metaTagCityActionDb  = require("../modal/metaTagsCities");

module.exports.storeCityMetaTags=function(req,res){
    var metatagregist = new metaTagCityActionDb(req.body)
    metatagregist.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}

// get list
module.exports.getAddMetaTags =function(req,res){

    // metaTagCityActionDb.find([ 
    //   // { $lookup :
    //   //   {
    //   //       from: 'addcitydatas',
    //   //       localField: 'city',
    //   //       foreignField: '_id',
    //   //       as: 'cityDataJoin'
    //   //   }
    //   // }
    //   ])
    metaTagCityActionDb.find().exec(function(err,data){
          if(err){
            console.log('--'+err+'--');  
            res.send({"responseCode":400,"responseMessage":"Meta Tags doesn't exist."})
          } else{
              res.send({"responseCode":200,"responseMessage":"Meta Tags are displayed successfully.","data": data})
  
          }
   })
}

// delete
module.exports.delete_addCityMetaTags=function(req,res){
    metaTagCityActionDb.deleteOne({_id:req.body.metaTagId}).exec((err,data)=>{
          if(err){
              res.send({"responseCode":400,"responseMessage":"Error."})
          } else{
              res.send({"responseCode":200,"responseMessage":"MetaTag successfully deleted."})
          }
      })
}

//edit 
module.exports.edit_AddCityMetaTags=function(req,res){
    metaTagCityActionDb.updateOne({_id: req.body.metaTagId},{city:req.body.city,title:req.body.title,metaTags:req.body.metaTags}).exec((err,data)=>{
      if(err){
        res.send({"responseCode":400,"responseMessage":"Some error please try after some time"})
      } else{
        res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
      }
    })
}

// fetch for frontend
module.exports.get_meta_tag=function(req,res){
  console.log('req.body------------->',req.body);
  metaTagCityActionDb.find({city:req.params.page}).exec(function(err,data){
      if(err){
          res.send({"responseCode":400,"responseMessage":"Meta tags doesn't exist."})
      } else{
          res.send({"responseCode":200,"responseMessage":"Meta tags are displayed successfully.","data": data})

      }
  })
}
