var Events = require("../modal/events");
var mongoose = require("mongoose")
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});




module.exports.getbannerEvent = (req, res) => {
    Events.find({}, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Banner Event Details Found ", result })
    })
}

module.exports.updatebannerEvent = (req, res) => {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseMessage": "Banner Image is missing" })
    }

    var data = req.body.image

    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        Events.updateOne({ _id: req.body._id }, req.body, (err, succ) => {
            if (err) {
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
            }
            else if (!succ)
                res.send({ "responseCode": 201, "responseMessage": "No data found" })
            else
            res.send({ "responseCode": 200, "responseMessage": "Event Banner data updated successfully", succ })
        })
    }
    )
}


module.exports.addEvent = function (req, res) {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseMessage": "Image is missing" });
    }
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        var data1 = req.body.verticalImage
        cloudinary.uploader.upload(data1, function (result) {
        req.body.verticalImage = result.url;    
                Events.find().exec(function (error, data) {
                    let tempData = data[0].addEvent;
                    tempData.push(req.body)
                    Events.update({ _id: data[0]._id }, { addEvent: tempData }).exec(function (err, succ) {
                        if (err) {
                            res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                        }
                        else if (!succ)
                            res.send({ responseCode: 201, responseMessage: "Event Not added Successfully" })
                        else {
                            res.send({ responseCode: 200, responseMessage: "Event added Successfully", succ })
                        }
                    })
                })
        })        
    })
}
module.exports.updateEvent = (req, res) => {
    if(!req.body.image){
        res.send({"responseCode":400,"responseMessage":"Banner Image is missing"})
    }
    if(!req.body.verticalImage){
        res.send({"responseCode":400,"responseMessage":"Vertical Image is missing"})
    }
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        var data1 = req.body.verticalImage;
        cloudinary.uploader.upload(data1, function (result) {
        req.body.verticalImage = result.url    

                    Events.find().exec(function (error, data) {
                        let tempData = data[0].addEvent;
                        let index = tempData.findIndex(function(item,index){
                            return(item._id==req.body._id);
                        })
                        tempData.splice(index,1,req.body);
                        Events.update({ _id: data[0]._id },{addEvent: tempData}).exec(function (err, succ) {
                            if (err) {
                                res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                            }
                            else if (!succ)
                                res.send({ responseCode: 201, responseMessage: "Blog Not added Successfully" })
                            else {
                                res.send({ responseCode: 200, responseMessage: "Blog added Successfully", succ })
                            }
                        })
                    })
                })        
     
    })
}

module.exports.addHightlights = function (req, res) {

    if (!req.body.images) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    console.log(req.body);
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Events.find().exec(function (error, data) {
            let tempData = data[0].addEvent;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            objData.highlights.push({images:req.body.images,imgTitle:req.body.imgTitle,imgDescription:req.body.imgDescription})
            tempData.splice(ind,1,objData);
            Events.update({ _id: data[0]._id }, { addEvent: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Hightlights not added" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Hightlights added Successfully", succ })
                }

            })
        })
    })
}
module.exports.editHightlights = function (req, res) {

    if (!req.body.highlights) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Events.find().exec(function (error, data) {
            let tempData = data[0].addEvent;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            
           objData.highlights=req.body.highlights;
           tempData.splice(ind,1,objData);

            Events.update({ _id: data[0]._id }, { addEvent: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ "responseCode": 201, "responseMessage": "Hightlights not updated" })
                else {
                    res.send({ "responseCode": 200,"responseMessage":"Hightlights updated Successfully", succ })
                }

            })
        })
    })
}

module.exports.addMoreImages = function (req, res) {

    if (!req.body.images) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    console.log(req.body);
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Events.find().exec(function (error, data) {
            let tempData = data[0].addEvent;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            objData.moreImages.push({images:req.body.images,imgTitle:req.body.imgTitle})
            tempData.splice(ind,1,objData);
            Events.update({ _id: data[0]._id }, { addEvent: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Image not added" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Image added Successfully", succ })
                }

            })
        })
    })
}

module.exports.editMoreImages = function (req, res) {

    if (!req.body.moreImages) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Events.find().exec(function (error, data) {
            let tempData = data[0].addEvent;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            
           objData.moreImages=req.body.moreImages;
           tempData.splice(ind,1,objData);

           Events.update({ _id: data[0]._id }, { addEvent: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ "responseCode": 201, "responseMessage": "Images not updated" })
                else {
                    res.send({ "responseCode": 200,"responseMessage":"Images updated Successfully", succ })
                }

            })
        })
    })
}


module.exports.deleteEvent =function (req, res) {
    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the blog Id" })
    }
        Events.find().exec(function (error, data) {
            Events.update({ _id: data[0]._id },{ $pull:{addEvent:{_id:req.body.id}} }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "No Event found" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Event Deleted Successfully" })
                }

            })
        })
    
}

module.exports.getEventDetails = function (req, res) {
    if (!req.body.slug) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the event slug" })
    }
    Events.find().exec(function (error, data) {
        let tempData = data[0].addEvent;
        let ind=-1;
        let objData = tempData.find(function(item,index){
            if(item.slug==req.body.slug){
               ind=index;
               return item;
            } 
        })
        if(typeof objData==undefined){
            res.send({ responseCode: 201, responseMessage: "No Event found" });
        }
        else{
            res.send({ responseCode: 200, responseMessage: "Event found!", objData  });
        }
    })
}






module.exports.search_blog =function(req,res){
   Events.find().exec(function(err,succ){
    let tempData=succ[0].addBlog;
        let objData = [];
        tempData.find(function(item,index){
            if((item.title).toLocaleLowerCase().includes(req.body.srchBlog.toLocaleLowerCase())){
               objData.push(item);
            }
        })
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Post successfully found.",data: objData})
       }
   })
}
