var History = require("../modal/history");


var mongoose = require("mongoose")

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});

module.exports.getHistory = (req, res) => {
    
  History.find({},(err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "History Details Found ", result })
    })
}




module.exports.updateHistory= (req, res) => {

  if (!req.body.bannerImage) {
    res.send({ "responseCode": 400, "responseMessage": "Banner Image is missing" })
  }
  console.log(req.body);
var data = req.body.bannerImage

  cloudinary.uploader.upload(data, function (result) {
      req.body.bannerImage = result.url
      History.updateOne({ _id: req.body._id }, req.body, (err, succ) => {
          if (err) {
              res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
          }
          else if (!succ)
              res.send({ "responseCode": 201, "responseMessage": "No data found" })
          else
              res.send({ "responseCode": 200, "responseMessage": "Event Banner data updated successfully", succ })
          })
  })
}

module.exports.addCards = function (req, res) {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        History.find().exec(function (error, data) {
            let tempData = data[0].cards;
            tempData.push(req.body)
            History.update({ _id: data[0]._id }, { cards: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Cards Not added Successfully" });
                else {
                    res.send({ responseCode: 200, responseMessage: "Cards added Successfully", succ });
                }
            })
        })
    })
}
module.exports.editCards = function (req, res) {

    if(!req.body.image){
        res.send({"responseCode":400,"responseMessage":"Card Image is missing"})
    }

    var data = req.body.image
        cloudinary.uploader.upload(data, function (result) {
            req.body.image = result.url

            History.find().exec(function (error, data) {
                        let tempData = data[0].cards;
                        let index = tempData.findIndex(function(item,index){
                            return(item._id==req.body._id);
                        })
                        tempData.splice(index,1,req.body);
                        History.update({ _id: data[0]._id },{cards: tempData}).exec(function (err, succ) {
                            if (err) {
                                res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                            }
                            else if (!succ)
                                res.send({ responseCode: 201, responseMessage: "Cards Not added Successfully" })
                            else {
                                res.send({ responseCode: 200, responseMessage: "Cards added Successfully", succ })
                            }
                        })
                    })
            })        
}

module.exports.deleteCards =function (req, res) {
    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the Card Id" })
    }
    History.find().exec(function (error, data) {
            History.update({ _id: data[0]._id },{ $pull:{cards:{_id:req.body.id}} }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "No Card found" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Card Deleted Successfully" })
                }

            })
        })
    
}


