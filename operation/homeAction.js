var homeDb = require("../modal/home");
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
          imgeConditn(req.body,res);
     }) 
}
}

function imgeConditn(body,res){
       let homeBanners=[];
       homeDb.findOne({},{homeBanner:1}).exec((error,data)=>{
        if(data==null){
          let dataArr =[]
          dataArr.push(body)
           var hmeregst = new homeDb({"homeBanner": dataArr})
           hmeregst.save(function(err,succ){
           if(err){
            res.send({"responseCode":400,"responseMessage":"Banner doesn't exist."})
           }else{
            res.send({"responseCode":200,"responseMessage":"Banner successfully added."})
           }
         })
        } else{
          homeBanners= data.homeBanner;
          homeBanners.push(body);
          homeDb.updateMany({_id: data._id},{homeBanner: homeBanners},function(err,succ){
          if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
            res.send({"responseCode":200,"responseMessage":"Banner successfully added."})         
          }
        })
       }       
  })
}


module.exports.getBanner =function(req,res){
    homeDb.find({},{"homeBanner":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Banner doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Banner lists are displayed successfully.",data})
            
        }
 })
}

module.exports.deleteBanner = function(req,res){
    homeDb.findOne({},{"homeBanner":1}).exec((error,succ)=>{
      for(let i=0;i< succ.homeBanner.length;i++){
        if(req.body.bannerId==succ.homeBanner[i]._id){
          succ.homeBanner.splice(i,1) 
        }
      }

    homeDb.update({},{homeBanner: succ.homeBanner}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Review successfully deleted."})
        }
    })
    })
}

module.exports.editBanner = function(req,res){
    if(req.body.banrImgs==""){
     imgeConditn(req.body,res);
  } else if(req.body.banrImgs!=""){
       cloudinary.uploader.upload(req.body.banrImgs, function(result) { 
       req.body.banrImgs=result.url;
     })  
    homeDb.findOne({},{"homeBanner":1}).exec((error,succ)=>{
      for(let i=0;i< succ.homeBanner.length;i++){
        if(req.body.bannerId==succ.homeBanner[i]._id){
          succ.homeBanner.splice(i,1,{"_id":req.body.bannerId,"banrTitle":req.body.banrTitle,"banrDescrptn": req.body.banrDescrptn,"banrImgs":req.body.banrImgs}) 
        }
      }
    homeDb.update({},{homeBanner: succ.homeBanner}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })
  }
}
module.exports.getHomeActivty =function(req,res){
    homeDb.find({},{"activty":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Activity doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Home Activty lists are displayed successfully.","homeActvtys": data})
        }
 })
}

module.exports.editHomeActivty=function(req,res){
     if(req.body.actImgs==""){
       editActivty(req,res);
     } else if(req.body.actImgs!=""){
       cloudinary.uploader.upload(req.body.actImgs, function(result) {
       req.body.actImgs=result.url;
          editActivty(req,res);
     })  
     }
}

function editActivty(req,res){
    homeDb.findOne({},{"activty":1}).exec((error,succ)=>{
      for(let i=0;i< succ.activty.length;i++){
        if(req.body.homeActId==succ.activty[i]._id){
          succ.activty.splice(i,1,{"_id":req.body.homeActId,"actTitle":req.body.actTitle,"actImgs":req.body.actImgs}) 
        }
      }
    homeDb.update({},{activty: succ.activty}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })
    }


module.exports.addReview=function(req,res){
  if(req.body.rvwPrfleImgs==""){
     rvwConditn(req.body,res);
  } else if(req.body.rvwPrfleImgs!=""){
       cloudinary.uploader.upload(req.body.rvwPrfleImgs, function(result) {
       req.body.rvwPrfleImgs=result.url;
          rvwConditn(req.body,res);
     })
}
}

function rvwConditn(body,res){
       let reviews=[];
       homeDb.findOne({},{review:1}).exec((error,data)=>{
        if(data==null){
          let dataArr =[]
          dataArr.push(body)
           var hmeregst = new homeDb({"review": dataArr})
           hmeregst.save(function(err,succ){
           if(err){
            res.send({"responseCode":400,"responseMessage":"Review doesn't exist."})
           }else{
            res.send({"responseCode":200,"responseMessage":"Review successfully added."})
           }
         })
        } else{
          reviews= data.review;
          reviews.push(body);
          homeDb.updateMany({_id: data._id},{review: reviews},function(err,succ){
          if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
            res.send({"responseCode":200,"responseMessage":"Review successfully added."})         
          }
        })
       }       
  })
}


module.exports.get_addRevw =function(req,res){
    homeDb.find({},{"review":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Post doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Review lists are displayed successfully.","memories": data})
            
        }
 })
}

module.exports.editAddReview=function(req,res){
    if(req.body.rvwPrfleImgs==""){
     rvwConditn(req,res);
    } else if(req.body.rvwPrfleImgs!=""){
       cloudinary.uploader.upload(req.body.rvwPrfleImgs, function(result) {
       req.body.rvwPrfleImgs= result.url;
       rvwConditn(req,res);
     }) 
    }
    function rvwConditn(req,res){
    homeDb.findOne({},{"review":1}).exec((error,succ)=>{
      for(let i=0;i< succ.review.length;i++){
        if(req.body.addRvwId==succ.review[i]._id){
          succ.review.splice(i,1,{"_id":req.body.addRvwId,"rvwName":req.body.rvwName,"rvwTestm":req.body.rvwTestm,"rvwPrfleImgs":req.body.rvwPrfleImgs}) 
        }
    }
    homeDb.update({},{review: succ.review}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })
    }
}


module.exports.deleteAddReview=function(req,res){
    homeDb.findOne({},{"review":1}).exec((error,succ)=>{
      for(let i=0;i< succ.review.length;i++){
        if(req.body.addRvwId==succ.review[i]._id){
          succ.review.splice(i,1) 
        }
      }

    homeDb.update({},{review: succ.review}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Review successfully deleted."})
        }
    })
    })   
}
module.exports.get_memries =function(req,res){
    homeDb.find({},{"memory":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Memories doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Memories lists are displayed successfully.","memories": data})
            
        }
 })
}
module.exports.editMemries=function(req,res){
    if(req.body.memImgs==""){
     editMemConditn(req,res);
    } else if(req.body.memImgs!=""){
       cloudinary.uploader.upload(req.body.memImgs, function(result) {
       req.body.memImgs=result.url;
          editMemConditn(req,res);
     })  
    }
}
function editMemConditn(req,res){
    homeDb.findOne({},{"memory":1}).exec((error,succ)=>{
      for(let i=0;i< succ.memory.length;i++){
        if(req.body.memId==succ.memory[i]._id){
          succ.memory.splice(i,1,{"_id":req.body.homeActId,"memTitle":req.body.memTitle,"memDesc":req.body.memDesc,"memImgs":req.body.memImgs}) 
        }
      }
    homeDb.update({},{memory: succ.memory}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })  
  } 
module.exports.getMobApp =function(req,res){
    homeDb.find({},{"mobleApp":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Mobile app doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Mobile app lists are displayed successfully.",data})
            
        }
 })
}

module.exports.editMobApp=function(req,res){
    if(req.body.mobImgs==""){
         editAppConditn(req,res);
      } else if(req.body.mobImgs!=""){
           cloudinary.uploader.upload(req.body.mobImgs, function(result) {
           req.body.mobImgs=result.url;
              editAppConditn(req,res);
         })
    }
}
function editAppConditn(req,res){
    homeDb.findOne({},{"mobleApp":1}).exec((error,succ)=>{
      for(let i=0;i< succ.mobleApp.length;i++){
        if(req.body.mobAppId==succ.mobleApp[i]._id){
          succ.mobleApp.splice(i,1,{"_id":req.body.mobAppId,"mobTitle":req.body.mobTitle,"mobImgs":req.body.mobImgs,"mobDesc":req.body.mobDesc,"mobLink":req.body.mobLink}) 
        }
      }
    homeDb.update({},{mobleApp: succ.mobleApp}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })  
  } 
module.exports.editTravelr=function(req,res){
    if(req.body.tvlrImgs==""){
     editTvlrConditn(req,res);
    } else if(req.body.tvlrImgs!=""){
     cloudinary.uploader.upload(req.body.tvlrImgs, function(result) {
       req.body.tvlrImgs=result.url;
          editTvlrConditn(req,res);
     }) 
    }
}
function editTvlrConditn(req,res){
    homeDb.findOne({},{"travelr":1}).exec((error,succ)=>{
      for(let i=0;i< succ.travelr.length;i++){
        if(req.body.travelrId==succ.travelr[i]._id){
          succ.travelr.splice(i,1,{"_id":req.body.travelrId,"tvlrTitle":req.body.tvlrTitle,"tvlrImgs":req.body.tvlrImgs,"tvlrDesc":req.body.tvlrDesc,"tvlrLink":req.body.tvlrLink}) 
        }
      }
    homeDb.update({},{travelr: succ.travelr}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })
    }  

module.exports.getTravelr =function(req,res){
    homeDb.find({},{"travelr":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Mobile app doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Traveller's lists are displayed successfully.",data})
            
        }
 })
}
module.exports.getTripAdvsr =function(req,res){
    homeDb.find({},{"trpAdvisor":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Mobile app doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Trip advisor lists are displayed successfully.",data})
            
        }
 })
}

module.exports.editTripAdvsr=function(req,res){
    if(req.body.trpImgs==""){
     editTrpConditn(req,res);
    } else if(req.body.trpImgs!=""){
       cloudinary.uploader.upload(req.body.trpImgs, function(result) {
       req.body.trpImgs=result.url;
       editTrpConditn(req,res);
         // }
     })  
    }
}
 function editTrpConditn(req,res){
    homeDb.findOne({},{"trpAdvisor":1}).exec((error,succ)=>{
      for(let i=0;i< succ.trpAdvisor.length;i++){
        if(req.body.trpAdvId==succ.trpAdvisor[i]._id){
          succ.trpAdvisor.splice(i,1,{"_id":req.body.trpAdvId,"trpLogoLnk":req.body.trpLogoLnk,"trpReadLnk":req.body.trpReadLnk,"trpWriteLnk":req.body.trpWriteLnk,"trpImgs":req.body.trpImgs}) 
        }
      }
    homeDb.update({},{trpAdvisor: succ.trpAdvisor}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    }) 
    }  


module.exports.readWrite_rvw=function(req,res){
       let readWriteRvws=[];
       homeDb.findOne({},{readWriteRvw:1}).exec((error,data)=>{
        if(data==null){
          let dataArr =[]
          dataArr.push(req.body)
           var hmeregst = new homeDb({"readWriteRvw": dataArr})
           hmeregst.save(function(err,succ){
           if(err){
            res.send({"responseCode":400,"responseMessage":"Read write review doesn't exist."})
           }else{
            res.send({"responseCode":200,"responseMessage":"Read write review successfully added."})
           }
         })
        } else{
          readWriteRvws= data.readWriteRvw;
          readWriteRvws.push(req.body);
          homeDb.updateMany({_id: data._id},{readWriteRvw: readWriteRvws},function(err,succ){
          if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
            res.send({"responseCode":200,"responseMessage":"Read write review successfully added."})         
          }
        })
       }       
  })
}


module.exports.getReadWriteRvw =function(req,res){
    homeDb.find({},{"readWriteRvw":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Read write review doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Read write review lists are displayed successfully.",data})
            
        }
 })
}
module.exports.getSocial =function(req,res){
    homeDb.find({},{"social":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Social post doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Social post lists are displayed successfully.","socialData": data})
              }
 })
}

module.exports.editSocial=function(req,res){
    homeDb.findOne({},{"social":1}).exec((error,succ)=>{
      for(let i=0;i< succ.social.length;i++){
        if(req.body.socialId==succ.social[i]._id){
          succ.social.splice(i,1,{"_id":req.body.socialId,"fcebookLnk":req.body.fcebookLnk,"instaLnk":req.body.instaLnk}) 
        }
      }
    homeDb.update({},{social: succ.social}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
        }
    })
    })
    
}


module.exports.addCtyComngSoon=function(req,res){
  if(req.body.cityImgs==""){
     trpConditn(req.body,res);
  } else if(req.body.cityImgs!=""){
       cloudinary.uploader.upload(req.body.cityImgs, function(result) {
       
       req.body.cityImgs=result.url;
          trpConditn(req.body,res);
         // }
     })
     // }  
}
}

function trpConditn(body,res){
       let addCtyComngSoons=[];
       homeDb.findOne({},{addCtyComngSoon:1}).exec((error,data)=>{
        if(data==null){
          let dataArr =[]
          dataArr.push(body)
           var hmeregst = new homeDb({"addCtyComngSoon": dataArr})
           hmeregst.save(function(err,succ){
           if(err){
            res.send({"responseCode":400,"responseMessage":"City doesn't exist."})
           }else{
            res.send({"responseCode":200,"responseMessage":"City successfully added."})
           }
         })
        } else{
          addCtyComngSoons= data.addCtyComngSoon;
          addCtyComngSoons.push(body);
          homeDb.updateMany({_id: data._id},{addCtyComngSoon: addCtyComngSoons},function(err,succ){
          if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
          } else{            
            res.send({"responseCode":200,"responseMessage":"City successfully added."})         
          }
        })
       }       
  })
}


module.exports.getAddCtyComngSoon =function(req,res){
    homeDb.find({},{"addCtyComngSoon":1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"City doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"City lists are displayed successfully.",data})
            
        }
 })
}