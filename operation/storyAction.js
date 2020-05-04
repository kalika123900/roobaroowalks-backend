var Story = require("../modal/addStory");
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
    module.exports.addStory = function (req, res) {
        if (!req.body.image) {
            res.send({ "resposneCode": 400, "responseMessage": "Image is missing" })
        }
        else {
            var data = req.body.image

            imageUploadToCloudinary(data, (resultCloud, err) => {
                var story = new Story({
                    title: req.body.title,
                    description: req.body.description,
                    image: resultCloud
                })
                story.save((err, result) => {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })

                    }
                    else if (!result)
                        res.send({ "responseCode": 201, "responseMessage": "Story Not save" })
                    else {
                        res.send({ responseCode: "200", "responseMessage": "Story Saved Successfully", result })

                    }
                })
            })
        }
    }
module.exports.editStory = (req, res) => {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseMessage": "Image is missing" })
    }
    else {
        var data = req.body.image
        cloudinary.uploader.upload(data, function (result) {
            req.body.image = result.url
            Story.findByIdAndUpdate({
                _id: req.body._id
            }, {

                    $set: req.body
                }, {
                    new: true
                }, (err, succ) => {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
                    }
                    else if (!result) {
                        res.send({ "responseCode": 201, "responseMessage": "No data found" })
                    }
                    else {
                        res.send({ "responseCode": 200, "responseMessage": "Story updated successfully", succ })
                    }
                })
        })
    }
}
module.exports.deleteStory = (req, res) => {
    if (!req.body.id)
        res.send({ "responseCode": 400, "responseMessage": "Please provide the story Id" })
    Story.findOneAndDelete({ _id: req.body.id }, (err, result) => {
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
        }
        else if (!result)
            res.send({ "responseCode": 401, "responseMessage": "No story found" })
        else {
            res.send({ "responseCode": 200, "responseMessage": "Story Deleted Successfully"})
        }
    })
}


module.exports.getStory = (req, res) => {
    
    Story.find((err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Story Details Found ", result })
    })
}












