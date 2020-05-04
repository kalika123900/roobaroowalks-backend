var feedbackDb = require("../modal/feedback");
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dxxstikij', 
  api_key: '321311861714116', 
  api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8' 
});


module.exports.add_City_feedback=function(req,res){
  if(req.body.client_img=="" && req.body.logo_img==""){
     feedbackCondition(req.body,res);
  } else if(req.body.client_img!="" && req.body.logo_img!=""){
            cloudinary.uploader.upload(req.body.client_img, function(result) {
            req.body.client_img=result.url;
            cloudinary.uploader.upload(req.body.logo_img, function(result) {
            req.body.logo_img=result.url;
            feedbackCondition(req.body,res);
           })  
     })
    } else if(req.body.client_img!="" && req.body.logo_img==""){
              cloudinary.uploader.upload(req.body.client_img, function(result) {
              req.body.client_img=result.url;
              feedbackCondition(req.body,res);
          });
    } else {
            cloudinary.uploader.upload(req.body.logo_img, function(result) {
            req.body.logo_img=result.url;
            feedbackCondition(req.body,res);
          });
    }
}

function feedbackCondition(body,res){
       var feedbckregist = new feedbackDb(body)
          feedbckregist.save(function(err,succ){
          console.log("dddd====>>"+JSON.stringify(err))
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
          res.send({"responseCode":200,"responseMessage":"Feedback successfully registered."})         
          }
          })
}

module.exports.get_cityFeedback =function(req,res){
    console.log("body====>>"+JSON.stringify(req.body))
    if(req.body.cityId){
    feedbackDb.find({cityId:req.body.cityId}).exec(function(err,data){
        console.log("data====>>"+JSON.stringify(data))
        console.log("err====>>"+JSON.stringify(err))
        if(err){
            res.send({"responseCode":400,"responseMessage":"Feedback doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Feedback lists are displayed successfully.","feedbck": data})
            
        }
 })
  } else {
    feedbackDb.find({}).exec(function(err,data){
        console.log("data====>>"+JSON.stringify(data))
        console.log("err====>>"+JSON.stringify(err))
        if(err){
            res.send({"responseCode":400,"responseMessage":"Feedback doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Feedback lists are displayed successfully.","feedbck": data})
            
        }
 })
  }
}

module.exports.edit_cityFeedback=function(req,res){
  if(req.body.client_img=="" && req.body.logo_img==""){
     editfbCondition(req.body,res);
  } else if(req.body.client_img!="" && req.body.logo_img!=""){
            cloudinary.uploader.upload(req.body.client_img, function(result) {
            req.body.client_img=result.url;
            cloudinary.uploader.upload(req.body.logo_img, function(result) {
            req.body.logo_img=result.url;
            editfbCondition(req.body,res);
           })  
     })
    } else if(req.body.client_img!="" && req.body.logo_img==""){
              cloudinary.uploader.upload(req.body.client_img, function(result) {
              req.body.client_img=result.url;
              editfbCondition(req.body,res);
          });
    } else {
            cloudinary.uploader.upload(req.body.logo_img, function(result) {
            req.body.logo_img=result.url;
            editfbCondition(req.body,res);
          });
    }

function editfbCondition(body,res){
          feedbackDb.update({_id: req.body.feedbckId},{logo_img:req.body.logo_img,client_img:req.body.client_img,desc:req.body.desc,title:req.body.title,selctCity:req.body.selctCity}).exec((err,data)=>{ 
          console.log("dddd====>>"+JSON.stringify(err))
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
          res.send({"responseCode":200,"responseMessage":"Details successfully updated.","edtdDtls": data})         
          }
          })
}
}

module.exports.delete_cityFeedback=function(req,res){
    feedbackDb.deleteOne({_id:req.body.feedbckId}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Feedback successfully deleted."})
        }
    })
}

module.exports.search_cityFeedback =function(req,res){
   feedbackDb.find({title : { $regex: req.body.srchCtyFedbck , $options: '$i' } }).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Feedback successfully found.",data: succ})
       }
   })
}