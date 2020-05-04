var Culture = require("../modal/culture");
var mongoose = require("mongoose")
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});

module.exports.addCultureHighlight = function (req, res) {

    if (!req.body.images) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Culture.find().exec(function (error, data) {
            let tempData = data[0];
            tempData.highlights.push({images:req.body.images,imgTitle:req.body.imgTitle,imgLink:req.body.imgLink});
            Culture.updateOne({ _id: data[0]._id }, { highlights: tempData.highlights }).exec(function (err, succ) {
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

module.exports.editCultureHighlight = function (req, res) {

    if (!req.body.highlights) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Culture.find().exec(function (error, data) {
            let tempData = data[0];
            let ind=-1;
            
            tempData.highlights=req.body.highlights;
           
           Culture.updateOne({ _id: data[0]._id }, { highlights: tempData.highlights }).exec(function (err, succ) {
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


module.exports.getbannerCulture = (req, res) => {
    Culture.find({}, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Banner Blog Details Found ", result })
    })
}
module.exports.deleteCultureCity =function (req, res) {
    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the culture city Id" })
    }
        Culture.find().exec(function (error, data) {
            Culture.update({ _id: data[0]._id },{ $pull:{addCity:{_id:req.body.id}} }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "No Culture City found" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Culture city Deleted Successfully" })
                }

            })
        })
    
}

module.exports.updatebannerCulture = (req, res) => {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseMessage": "Banner Image is missing" })
    }

    var data = req.body.image

    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        Culture.updateOne({ _id: req.body._id }, req.body, (err, succ) => {
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


module.exports.addCultureCity = function (req, res) {
    
    Culture.find().exec(function (error, data) {
            let tempData = data[0].addCity;
            tempData.push(req.body)
            Culture.updateOne({ _id: data[0]._id }, { addCity: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Culture Not added Successfully" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Culture added Successfully", succ })
                }
            })
        })
}
module.exports.editCultureCity = (req, res) => {
    
    Culture.find().exec(function (error, data) {
        let tempData = data[0].addCity;
        let index = tempData.findIndex(function(item,index){
            return(item._id==req.body._id);
        })
        tempData.splice(index,1,req.body);
        Culture.updateOne({ _id: data[0]._id },{addCity: tempData}).exec(function (err, succ) {
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
     
    
}

module.exports.addCultureMoreImages = function (req, res) {

    if (!req.body.images) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Culture.find().exec(function (error, data) {
            let tempData = data[0].addCity;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            objData.moreImages.push({images:req.body.images,imgTitle:req.body.imgTitle})
            tempData.splice(ind,1,objData);
            Culture.updateOne({ _id: data[0]._id }, { addCity: tempData }).exec(function (err, succ) {
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

module.exports.editCultureMoreImages = function (req, res) {

    if (!req.body.moreImages) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Culture.find().exec(function (error, data) {
            let tempData = data[0].addCity;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            
           objData.moreImages=req.body.moreImages;
           tempData.splice(ind,1,objData);

           Culture.updateOne({ _id: data[0]._id }, { addCity: tempData }).exec(function (err, succ) {
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

