var instaDb = require("../modal/insta");
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dxxstikij', 
  api_key: '321311861714116', 
  api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8' 
});


module.exports.add_instaImgs=function(req,res){
  if(req.body.insta_imgs==""){
     instaCondition(req.body,res);
  } else if(req.body.insta_imgs!=""){
       cloudinary.uploader.upload(req.body.insta_imgs, function(result) {
       req.body.insta_imgs=result.url;
          instaCondition(req.body,res);
     })
}
function instaCondition(body,res){
       var instaregist = new instaDb(body)
          instaregist.save(function(err,succ){
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
          res.send({"responseCode":200,"responseMessage":"Insta images successfully added."})         
          }
          })
}
}

module.exports.get_instaImgs =function(req,res){
    instaDb.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Insta images doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Insta images lists are displayed successfully.","instaImgLists": data})
            
        }
 })
}

module.exports.edit_instaImgs=function(req,res){
  if(req.body.insta_imgs==""){
     instaCondition(req.body,res);
  } else if(req.body.insta_imgs!=""){
       cloudinary.uploader.upload(req.body.insta_imgs, function(result) {
       req.body.insta_imgs=result.url;
          instaCondition(req.body,res);
     })
}
function instaCondition(body,res){
          instaDb.update({_id: req.body._id},{insta_imgs:req.body.insta_imgs}).exec((err,data)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
          res.send({"responseCode":200,"responseMessage":"Details successfully updated.","edtdDtls": data})         
          }
          })
}
}

module.exports.delete_instaImgs=function(req,res){
    instaDb.deleteOne({_id:req.body.instaId}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Insta image successfully deleted."})
        }
    })
}