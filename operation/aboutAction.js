var about = require("../modal/aboutUs");


var mongoose = require("mongoose")

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});




module.exports.getAbout = (req, res) => {
    about.find( {},(err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "AboutUs Details Found ", result })
    })
}



module.exports.updateAbout= (req, res) => {
    if(!req.body.bannerImage){
        res.send({"responseCode":400,"responseMessage":"Banner Image is missing"})
    }
    else {
        var data = req.body.bannerImage
        cloudinary.uploader.upload(data, function(result) {
            req.body.bannerImage= result.url     
    about.update({
    }, {
          $set: req.body
        }, {
            new: true
        }, (err, succ) => {
            if (err) {
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong",err })
            } 
            else if(!result){
                res.send({ "responseCode": 201, "responseMessage": "No data found"})
            } 
            else {
                res.send({ "responseCode": 200, "responseMessage": "About data updated successfully" ,succ})
            }
        })
    })
           
    }
}
