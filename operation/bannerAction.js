var bannerDb = require("../modal/banner");
// var bannersDb = require("../modal/banner");

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dxxstikij', 
  api_key: '321311861714116', 
  api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8' 
});


module.exports.addBannr=function(req,res){
  if(req.body.banrImgs==""){
     imgeConditn(req.body,res);
  } else if(req.body.banrImgs!=""){
       cloudinary.uploader.upload(req.body.banrImgs, function(result) {
       
       req.body.banrImgs=result.url;
       // if(ctyImg.length==req.body.banrImgs.length){
       //    req.body.banrImgs = ctyImg;
          imgeConditn(req.body,res);
         // }
     })
     // }  
}

function imgeConditn(body,res){
       var banrregst = new bannerDb(body)\
          banrregst.save(function(err,succ){
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the imgeConditn fields."})
          } else{
            
          res.send({"responseCode":200,"responseMessage":"Banner successfully added."})
         
          }

          })
}
// }
}


module.exports.getBanner =function(req,res){
    bannerDb.find().
    exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Banner doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Banner lists are displayed successfully.","banners": data})
            
        }
 })
}



module.exports.homeActivty=function(req,res){
  if(req.body.banrImgs=="" && req.body.imgs==""){
     step1Condition(req.body,res);
  } else if(req.body.banrImgs!="" && req.body.imgs!=""){
       cloudinary.uploader.upload(req.body.banrImgs, function(result) {
       req.body.banrImgs=result.url;
             cloudinary.uploader.upload(req.body.imgs, function(result) {
             req.body.imgs=result.url;
             step1Condition(req.body,res);
           })  
     })
   
       } else if(req.body.banrImgs!="" && req.body.imgs==""){
         cloudinary.uploader.upload(req.body.banrImgs, function(result) {
         req.body.banrImgs=result.url;
            step1Condition(req.body,res);
          });
    } else {
        cloudinary.uploader.upload(req.body.imgs, function(result) {
             req.body.imgs=result.url;
                step1Condition(req.body,res);
          });
    }
function step1Condition(body,res){
       var banrregst = new bannerDb(body)
          banrregst.save(function(err,succ){
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{
          res.send({"responseCode":200,"responseMessage":"home activity successfully registered."})
          }
          })
}
}

// db.userdetails.find({"education":"M.C.A."},{"user_id" : 1}).

module.exports.getHomeActivty =function(req,res){
    bannerDb.find().
    exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Banner doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Home Activty lists are displayed successfully.","data":{"data": data}})
            
        }
 })
}