var Traveller = require("../modal/travellerResource");
var mongoose = require("mongoose")
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});

imageUploadToCloudinary = (imageB64, callback) => {
    cloudinary.v2.uploader.upload(imageB64, (err, result) => {
        callback(result.url);
    })
},
    module.exports.getaddBanner = function (req, res) {
        Traveller.find().exec(function (err, data) {
            let tempData = data[0].addBanner;
            if (err)
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
            else if (!data)
                res.send({ "responseCode": 404, "responseMessage": "No data found" })
            else if (data)
                res.send({ "responseCode": 200, "responseMessage": "Banner Details Found ", tempData })
        })
    }

module.exports.editaddBanner = (req, res) => {
    var data = req.body.BannerImage;
    cloudinary.uploader.upload(data, function (result) {
        req.body.BannerImage = result.url
        Traveller.find().exec(function (error, data) {
            let tempData = data[0].addBanner;
            let index = tempData.findIndex(function (item, index) {
                return (item._id == req.body._id);
            })
            tempData.splice(index, 1, req.body);
            Traveller.update({ _id: data[0]._id }, { addBanner: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "AddBanner update Unsuccessfull" })
                else {
                    res.send({ responseCode: 200, responseMessage: "AddBanner updated Successfully", tempData })
                }
            })
        })
    }
    )
}

module.exports.addWalk = function (req, res) {
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        Traveller.find().exec(function (error, data) {
            let tempData = data[0].addWalk; 
            tempData.push({image:req.body.image,description:req.body.description,cityId:req.body.cityId,walkTitle:req.body.walkTitle,walkId:req.body.walkId,cityName:req.body.cityName})
            Traveller.update({ addWalk: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Traveller Walk not added" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Traveller walk added Successfully" })
                }
            })
        })
    })
}
module.exports.getWalk = function (req, res) {
        Traveller.find({}, { addWalk: 1 }, (err, result) => {
            if (err)
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
            else if (!result)
                res.send({ "responseCode": 404, "responseMessage": "No data found" })
            else if (result)
                res.send({ "responseCode": 200, "responseMessage": "Walk Details Found ", result })
        })
    }

module.exports.getWalkByCity = function (req, res) {

    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the city Id" })
    }
        Traveller.aggregate([{$project:{addWalk:{$filter:{input:"$addWalk",as:"addWalk",cond: { $eq:["$$addWalk.cityId", req.body.id]}}}}}]).exec(function (error, data) {
                if (error) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!data)
                    res.send({ responseCode: 201, responseMessage: "No walk found" })
                else {
                      res.send({ responseCode: 200, responseMessage: "Walk found Successfully",data })
                }

            })
}


    module.exports.editWalk_trav = (req, res) => {

 
        var data = req.body.image;
        cloudinary.uploader.upload(data, function (result) {
            req.body.image = result.url
            Traveller.find().exec(function (error, data) {
                let tempData = data[0].addWalk;
                let index = tempData.findIndex(function (item, index) {
                    return (item._id == req.body._id);
                })
                tempData.splice(index, 1, req.body);
                Traveller.update({ _id: data[0]._id }, { addWalk: tempData }).exec(function (err, succ) {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                    }
                    else if (!succ)
                        res.send({ responseCode: 201, responseMessage: "AddWalk Not updated Successfully" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "AddWalk updated Successfully", succ })
                    }
                })
            })
        }
        )
    }
    module.exports.deleteWalk_trav = function (req, res) {

        if (!req.body.id) {
            res.send({ "responseCode": 400, "responseCode": "Please provide the blog Id" })
        }
        
            Traveller.find().exec(function (error, data) {
                
                Traveller.update({ _id: data[0]._id },{ $pull:{addWalk:{_id:req.body.id}} }).exec(function (err, succ) {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "No walk found" })
                    }
                    else if (!succ)
                        res.send({ responseCode: 201, responseMessage: "Walk not deleted" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Walk Deleted Successfully" })
                    }
    
                })
            })
        
    }
    module.exports.getwalkDetail_trav = function (req, res) {

        if (!req.body.id) {
            res.send({ "responseCode": 400, "responseCode": "Please provide the blog Id" })
        }
        
            Traveller.find().exec(function (error, data) {
                let tempData = data[0].addWalk;
                let detail = tempData.find(function(item,index){
                    if(item._id==req.body.id)
                    
                    return(item);
                })
                
                    if (error) {
                        res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                    }
                    else if (!data)
                        res.send({ responseCode: 201, responseMessage: "No Walk found" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Walk found Successfully",detail })
                    }
    
                })
    }


    module.exports.addArticle = function (req, res) {
            Traveller.find().exec(function (error, data) {             
               tempData.push(req.body)
                Traveller.update({ article: tempData }).exec(function (err, succ) {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                    }
                    else if (!succ)
                        res.send({ responseCode: 201, responseMessage: "Traveller Artice not added" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Traveller Article added Successfully",succ })
                    }
                })
            })   
    }
    module.exports.getArticle = function (req, res) {
        Traveller.find({}, { article: 1 }, (err, result) => {
            if (err)
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
            else if (!result)
                res.send({ "responseCode": 404, "responseMessage": "No data found" })
            else if (result)
                res.send({ "responseCode": 200, "responseMessage": "Article Details Found ", result })
        })
    }
    module.exports.editArticle = (req, res) => {
               if(!req.body._id||!req.body.firstArticle||!req.body.secondArticle||!req.body.title){
               res.send({"responseCode":400,"responseMessage":"Please provide the required field"})
               }
            Traveller.find().exec(function (error, data) {
                let tempData = data[0].article;
                let index = tempData.findIndex(function (item, index) {                    
                    return (item._id == req.body._id);                    
                })
                if(index!=-1){
                tempData.splice(index, 1, req.body);
                Traveller.update({ _id: data[0]._id }, { article: tempData }).exec(function (err, succ) {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                    }
                    else if (!succ)
                        res.send({ responseCode: 201, responseMessage: "Article not found" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Article updated Successfully", succ })
                    }
                })
            }
            else{
                res.send({"responseCode":400,"responseMessage":"Invalid Article"})
            }
            })
    }
    module.exports.deleteArticle = function (req, res) {
        if (!req.body.id) {
            res.send({ "responseCode": 400, "responseCode": "Please provide the Article Id" })
        }        
            Traveller.find().exec(function (error, data) {               
                Traveller.update({ _id: data[0]._id },{ $pull:{article:{_id:req.body.id}} }).exec(function (err, succ) {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "No article found" })
                    }
                    else if (!succ)
                        res.send({ responseCode: 201, responseMessage: "Invalid Article" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Article Deleted Successfully" })
                    }    
                })
            })       
    }
    module.exports.getarticleDetail = function (req, res) {
        if (!req.body.id) {
            res.send({ "responseCode": 400, "responseCode": "Please provide the article Id" })
        }        
            Traveller.find().exec(function (error, data) {
                let tempData = data[0].article;
                let detail = tempData.find(function(item,index){
                    if(item._id==req.body.id)                    
                    return(item);
                })
                                    if (error) {
                        res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                    }
                    else if (!data)
                        res.send({ responseCode: 201, responseMessage: "No article found" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Article found Successfully",detail })
                    }    
                })
    }
    module.exports.addReview = function (req, res) {   
        var data = req.body.image;
        cloudinary.uploader.upload(data, function (result) {
            req.body.image = result.url
            Traveller.find().exec(function (error, data) {
                let tempData = data[0].addReview;
              tempData.push(req.body)
                Traveller.update({ addReview: tempData }).exec(function (err, succ) {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                    }
                    else if (!succ)
                        res.send({ responseCode: 201, responseMessage: "Traveller Review not added" })
                    else {
                        res.send({ responseCode: 200, responseMessage: "Traveller Review added Successfully" })
                    }    
                })
            })
        })
    }
    module.exports.getReview = function (req, res) {
        Traveller.find({}, { addReview: 1 }, (err, result) => {
            if (err)
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
            else if (!result)
                res.send({ "responseCode": 404, "responseMessage": "No data found" })
            else if (result)
                res.send({ "responseCode": 200, "responseMessage": "Review Found Successfully ", result })
        })
    }
    module.exports.editReview = (req, res) => {
        if(!req.body._id||!req.body.title||!req.body.link||!req.body.image){
        res.send({"responseCode":400,"responseMessage":"Please provide the required field"})
        } 
     Traveller.find().exec(function (error, data) {
         let tempData = data[0].addReview;
         let index = tempData.findIndex(function (item, index) {            
             return (item._id == req.body._id);            
         })
         if(index!=-1){
         tempData.splice(index, 1, req.body);
         Traveller.update({ _id: data[0]._id }, { addReview: tempData }).exec(function (err, succ) {
             if (err) {
                 res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
             }
             else if (!succ)
                 res.send({ responseCode: 201, responseMessage: "Review not found" })
             else {
                 res.send({ responseCode: 200, responseMessage: "Review updated Successfully", succ })
             }
         })
     }
     else{
         res.send({"responseCode":400,"responseMessage":"Invalid Review"})
     }
     })
}
module.exports.deleteReview = function (req, res) {
    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the Article Id" })
    }   
        Traveller.find().exec(function (error, data) {           
           Traveller.update({ _id: data[0]._id },{ $pull:{addReview:{_id:req.body.id}} }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "No Review found" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Invalid Review" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Review Deleted Successfully" })
                }
            })
        })    
}
module.exports.getreviewDetail = function (req, res) {
    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the Review Id" })
    }   
        Traveller.find().exec(function (error, data) {
            let tempData = data[0].addReview;
            let detail = tempData.find(function(item,index){
                if(item._id==req.body.id)               
                return(item);
            })           
                if (error) {
                    res.send({ "responseCode": 400, "responseMessage": "Invalid Review Id" })
                }
                else if (!data)
                    res.send({ responseCode: 201, responseMessage: "No Review found" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Review Detail found Successfully",detail })
                }
            })
}


