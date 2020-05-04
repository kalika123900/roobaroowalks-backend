var guidesActionDb = require("../modal/guides");
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dxxstikij', 
  api_key: '321311861714116', 
  api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8' 
});


module.exports.addGuide=function(req,res){
  if(req.body.image==""){
     imgCndtion(req.body,res);
  } else if(req.body.image!=""){
       cloudinary.uploader.upload(req.body.image, function(result) {
       req.body.image=result.url;
          imgCndtion(req.body,res);         
     })      
}

function imgCndtion(body,res){
       var guideregist = new guidesActionDb(body)
          guideregist.save(function(err,succ){
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
          res.send({"responseCode":200,"responseMessage":"Guide successfully added."})         
          }
          })
}
}

module.exports.get_addGuide =function(req,res){
    var _cityId = req.body.cityId;
    console.log('ramlal'+_cityId);
    guidesActionDb.find({cityId:_cityId}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Guide doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Guide lists are displayed successfully.","guides": data})
            
        }
 })
}

module.exports.edit_addGuide=function(req,res){
  console.log(req.body);  
  if(req.body.image==""){
     guideCondition(req.body,res);
  } else if(req.body.image!=""){
       cloudinary.uploader.upload(req.body.image, function(result) {
       req.body.image=result.url;
          guideCondition(req.body,res);
     })
}
function guideCondition(body,res){
    console.log(body);
    guidesActionDb.updateOne({_id: req.body._id},{cityId:req.body.cityId,cityName:req.body.cityName,name:req.body.name,title:req.body.title,description:req.body.description,image:req.body.image,facebookLink:req.body.facebookLink,twitterLink:req.body.twitterLink,instaLink:req.body.instaLink}).exec((err,data)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
          res.send({"responseCode":200,"responseMessage":"Details successfully updated.","edtdDtls": data})         
          }
          })
}
}

module.exports.delete_addGuide=function(req,res){
    guidesActionDb.deleteOne({_id:req.body.guideId}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Guide successfully deleted."})
        }
    })
}
module.exports.get_allGuide = function(req,res){
    console.log('--------------');
    guidesActionDb.find({}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Guide doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Guide lists are displayed successfully.","guides": data})
            
        }
 })
}
module.exports.search_addGuide =function(req,res){
   guidesActionDb.find({cityName : { $regex: req.body.srch_guide , $options: '$i' } }).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Guide successfully found.",data: succ})
       }
   })
}