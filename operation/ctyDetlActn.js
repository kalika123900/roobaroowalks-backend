var ctyDetlDb = require("../modal/ctyDetl");
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dxxstikij', 
  api_key: '321311861714116', 
  api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8' 
});

module.exports.addCtyBannr=function(req,res){
  if(req.body.ctyBnrImgs==""){
     imgeConditn(req.body,res);
  } else if(req.body.ctyBnrImgs!=""){
       cloudinary.uploader.upload(req.body.ctyBnrImgs, function(result) { 
       req.body.ctyBnrImgs=result.url;
          imgeConditn(req.body,res);
     })
}

function imgeConditn(body,res){
       var ctyDetlReg = new ctyDetlDb(body)
       ctyDetlReg.save(function(err,succ){
        if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      }else{

       ctyDetlDb.update({ctyId: req.body.ctyId},{bnrTitle:req.body.bnrTitle,ctyName:req.body.ctyName,ctyDesc:req.body.ctyDesc,ctyBnrImgs:req.body.ctyBnrImgs}).exec((err,succ)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{
          ctyDetlDb.findOne({ctyId: req.body.ctyId},{_id:1}).exec(function(err,data){
          res.send({"responseCode":200,"responseMessage":"Banner successfully added.","data":{"_id": data._id}})
          });
          }

          })
     }
     })
}
}
module.exports.getCtyBanner =function(req,res){
    ctyDetlDb.find({},{"bnrTitle":1,"ctyName":1,"ctyDesc":1,"ctyBnrImgs":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Banner doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Banner lists are displayed successfully.","banners": data})
            
        }
 })
}
module.exports.editAddBnrDetl=function(req,res){
    ctyDetlDb.update({_id: req.body.ctyDetlId},{bnrTitle:req.body.bnrTitle,ctyName:req.body.ctyName,ctyDesc:req.body.ctyDesc,ctyBnrImgs:req.body.ctyBnrImgs}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
}
module.exports.deleteAddBnrDetl=function(req,res){
    var ctyDetlReg = new ctyDetlDb(req.body)
    ctyDetlDb.deleteOne({_id:req.body.ctyDetlId}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Banner successfully deleted."})
        }
    })
}
module.exports.ctyDetlActvty=function(req,res){
  if(req.body.actImgs==""){
     imgeConditn(req.body,res);
  } else if(req.body.actImgs!=""){
       cloudinary.uploader.upload(req.body.actImgs, function(result) { 
       req.body.actImgs=result.url;
          imgeConditn(req.body,res);
     }) 
}

function imgeConditn(body,res){
       var ctyDetlReg = new ctyDetlDb(body)
       ctyDetlDb.updateMany({ctyId: req.body.ctyId},{actTitle:req.body.actTitle,actImgs:req.body.actImgs,actDesc:req.body.actDesc}).exec((err,succ)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{
            
          res.send({"responseCode":200,"responseMessage":"Activity successfully added."})
         
          }

          })
}
}


module.exports.getCtyDetlActvty =function(req,res){
    ctyDetlDb.find({},{"actTitle":1,"actDesc":1,"actImgs":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Activity doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Activity lists are displayed successfully.","ActvtyLists": data})
            
        }
 })
}


module.exports.walkngTour=function(req,res){
  if(req.body.wlkPostrImgs==""){
     imgeConditn(req.body,res);
  } else if(req.body.wlkPostrImgs!=""){
       cloudinary.uploader.upload(req.body.wlkPostrImgs, function(result) {
       
       req.body.wlkPostrImgs=result.url;
          imgeConditn(req.body,res);
     })
}

function imgeConditn(body,res){
       var ctyDetlReg = new ctyDetlDb(body)

          ctyDetlDb.update({ctyId: req.body.ctyId},{wlkName:req.body.wlkName,wlkCty:req.body.wlkCty,wlkPostrImgs:req.body.wlkPostrImgs,wlkShrtDesc:req.body.wlkShrtDesc}).exec((err,succ)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{
            
          res.send({"responseCode":200,"responseMessage":"Walk tour successfully added."})
         
          }

          })
}
}
module.exports.WTaddMreImgs=function(req,res){
  if(req.body.wlkMreImgs.length==0){
     mreImgCndtn(req.body,res);
  } else if(req.body.wlkMreImgs.length!=0){
    let moreImg = [];
    for(let i=0;i< req.body.wlkMreImgs.length;i++){
       cloudinary.uploader.upload(req.body.wlkMreImgs[i], function(result) {
       moreImg.push(result.url);
       if(moreImg.length==req.body.wlkMreImgs.length){
          req.body.wlkMreImgs = moreImg;
          mreImgCndtn(req.body,res);
         }
     })
     }  
}

function mreImgCndtn(body,res){
       var ctyDetlReg = new ctyDetlDb(body)
          ctyDetlDb.update({ctyId: req.body.ctyId},{wlkMreImgs:req.body.wlkMreImgs,wlkFullDesc:req.body.wlkFullDesc}).exec((err,data)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Walk tour doesn't exist."})
          } else{
          res.send({"responseCode":200,"responseMessage":"Images added."})
          }
          })
}
}


module.exports.getWlkngTourShrt =function(req,res){
    ctyDetlDb.find({},{"wlkName":1,"wlkCty":1,"wlkShrtDesc":1,"wlkPostrImgs":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Walk doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Walk tour lists for short description are displayed successfully.","tourLstShrt": data})
            
        }
 })
}

module.exports.getWlkngTourFul =function(req,res){
    ctyDetlDb.find({},{"wlkName":1,"wlkCty":1,"fullDesc":1,"wlkPostrImgs":1,"wlkMreImgs":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Walk doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Walk tour lists for full description are displayed successfully.","tourLstFul": data})
            
        }
 })
}


module.exports.foodExp=function(req,res){
  if(req.body.fodPostrImgs==""){
     imgeConditn(req.body,res);
  } else if(req.body.fodPostrImgs!=""){
       cloudinary.uploader.upload(req.body.fodPostrImgs, function(result) {
       
       req.body.fodPostrImgs=result.url;
          imgeConditn(req.body,res);
     })
}

function imgeConditn(body,res){
       var ctyDetlReg = new ctyDetlDb(body)

          ctyDetlDb.update({ctyId: req.body.ctyId},{fodNme:req.body.fodNme,fodCty:req.body.fodCty,fodPostrImgs:req.body.fodPostrImgs,fodShrtDesc:req.body.fodShrtDesc}).exec((err,succ)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{
            
          res.send({"responseCode":200,"responseMessage":"Food exp. successfully added."})
         
          }

          })
}
}
module.exports.FEaddMreImgs=function(req,res){
  if(req.body.fodMreImgs.length==0){
     mreImgCndtn(req.body,res);
  } else if(req.body.fodMreImgs.length!=0){
    let fodmoreImg = [];
    for(let i=0;i< req.body.fodMreImgs.length;i++){
       cloudinary.uploader.upload(req.body.fodMreImgs[i], function(result) {
       fodmoreImg.push(result.url);
       if(fodmoreImg.length==req.body.fodMreImgs.length){
          req.body.fodMreImgs = fodmoreImg;
          mreImgCndtn(req.body,res);
         }
     })
     }  
}

function mreImgCndtn(body,res){
       var ctyDetlReg = new ctyDetlDb(body)
          ctyDetlDb.update({ctyId: req.body.ctyId},{fodMreImgs:req.body.fodMreImgs,fodFullDesc:req.body.fodFullDesc}).exec((err,succ)=>{ 
          if(err){
          res.send({"responseCode":400,"responseMessage":"Food exp. doesn't exist."})
          } else{
          res.send({"responseCode":200,"responseMessage":"Images added."})
          }
          })
}
// }
}


module.exports.getFoodExpShrt =function(req,res){
    ctyDetlDb.find({},{"fodNme":1,"fodCty":1,"fodShrtDesc":1,"fodPostrImgs":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Food exp. doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Food exp. lists for short description are displayed successfully.","foodExpShrt": data})
            
        }
 })
}

module.exports.getFoodExpFul =function(req,res){
    ctyDetlDb.find({},{"fodNme":1,"fodCty":1,"fodFullDesc":1,"fodPostrImgs":1,"fodMreImgs":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Food exp. doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Food exp. lists for full description are displayed successfully.","foodExpFul": data})
            
        }
 })
}