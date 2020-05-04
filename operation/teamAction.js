var Team = require("../modal/ourTeam");
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
    module.exports.addTeam = function (req, res) {
        if (!req.body.profileImage) {
            res.send({ "resposneCode": 400, "responseMessage": "Image is missing" })
        }
        else {
            var data = req.body.profileImage

            imageUploadToCloudinary(data, (resultCloud, err) => {
                req.body.profileImage= resultCloud;
                var team = new Team(req.body);
                team.save((err, result) => {
                    if (err) {
                        res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
                    }
                    else if (!result)
                        res.send({ "responseCode": 201, "responseMessage": "Team Not save" })
                    else {
                        res.send({ responseCode: "200", "responseMessage": "Out Team Content Saved Successfully", result })

                    }
                })
            })
        }
    }
module.exports.editTeam = (req, res) => {
    if (!req.body.profileImage) {
        res.send({ "responseCode": 400, "responseMessage": "Image is missing" })
    }
    else {
        var data = req.body.profileImage
        cloudinary.uploader.upload(data, function (result) {
            req.body.profileImage = result.url
            Team.findByIdAndUpdate({
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
                        res.send({ "responseCode": 200, "responseMessage": "Our Team Content updated successfully", succ })
                    }
                })
        })
    }
}
module.exports.deleteTeam = (req, res) => {
    if (!req.body.id)
        res.send({ "responseCode": 400, "responseMessage": "Please provide the teamId" })
    Team.findOneAndDelete({ _id: req.body.id }, (err, result) => {
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
        }
        else if (!result)
            res.send({ "responseCode": 401, "responseMessage": "No Team found" })
        else {
            res.send({ "responseCode": 200, "responseMessage": "Team Deleted Successfully"})
        }
    })
}

module.exports.getTeam = (req, res) => {
    Team.find((err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" ,err})
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage":"Team Details Found ", result })
    })
}












