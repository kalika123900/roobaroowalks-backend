var career = require("../modal/career");


var mongoose = require("mongoose")

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});

module.exports.getCareer = (req, res) => {
    
    career.find({},(err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Career Details Found ", result })
    })
}




module.exports.updateCareer= (req, res) => {
    if(!req.body.leftImage){
        res.send({"responseCode":400,"responseMessage":"Left Image is missing"})
    }
    if(!req.body.rightImage){
        res.send({"responseCode":400,"responseMessage":"Right Image is missing"})
    }
    if(!req.body.bannerImage){
        res.send({"responseCode":400,"responsemessage":"Banner Image is missing"})
    }
    else {
        var data1 = req.body.leftImage
        var data2=req.body.rightImage
        var data3=req.body.bannerImage
        cloudinary.uploader.upload(data1, function(result) {
            req.body.rightImage= result.url;
            cloudinary.uploader.upload(data2, function(result2) {
                req.body.rightImage= result2.url;
                cloudinary.uploader.upload(data3, function(result3) {
                    req.body.bannerImage= result3.url;
    career.update({
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
                res.send({ "responseCode": 200, "responseMessage": "Career data updated successfully" ,succ})
            }  
        })
    })
    })
    })        
    }
}

module.exports.addCards = function (req, res) {

    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    console.log(req.body);
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        career.find().exec(function (error, data) {
            let tempData = data[0].cards;
            tempData.push(req.body)
            career.update({ _id: data[0]._id }, { cards: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Event Not added Successfully" });
                else {
                    res.send({ responseCode: 200, responseMessage: "Event added Successfully", succ });
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

            career.find().exec(function (error, data) {
                        let tempData = data[0].cards;
                        let index = tempData.findIndex(function(item,index){
                            return(item._id==req.body._id);
                        })
                        tempData.splice(index,1,req.body);
                        career.update({ _id: data[0]._id },{cards: tempData}).exec(function (err, succ) {
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
}

module.exports.deleteCards =function (req, res) {
    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the Card Id" })
    }
    career.find().exec(function (error, data) {
        career.update({ _id: data[0]._id },{ $pull:{cards:{_id:req.body.id}} }).exec(function (err, succ) {
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

module.exports.joinus = function (req, res) {
    //mail
  
        const userInfo = `
          <p>Career (Roobaroo Walks)</p>
          <h3>Details</h3>
          <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>City: ${req.body.city}</li>
            <li>Contribute: ${req.body.contribute}</li>
          </ul>
        `;
      
        "use strict";
          const nodemailer = require("nodemailer");
      
          // async..await is not allowed in global scope, must use a wrapper
          async function main(){
      
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'roobaroodev@gmail.com', // generated ethereal user
                pass: 'VFgg%%$#%&GFR' // generated ethereal password
              },
              tls:{
                rejectUnauthorized:false
              }
            });
      
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Roobaroo Walks" <roobaroodev@gmail.com>', // sender address
              to: "bookings@roobaroowalks.com", // list of receivers
              subject: "Career request", // Subject line
              // text: "Hello world?", // plain text body
              html: userInfo // html body
            });
      
            console.log("Message sent: %s", info.messageId); 
    
            if(info){
                // console.log('send');
                res.send({respcode: 200})
            }
            // res.sendStatus(200);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
      
          main().catch(console.error);
      
    

    //mail end

    // career.find((err, result) => {
    //   let tempData= result[0].joinUs
    //   tempData.push(req.body);
    //   career.update({_id:result[0]._id},{joinUs: tempData},(error,succ)=>{
    //     if (error) {
    //         res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
    //     }
    //     else if (!succ)
    //         res.send({ responseCode: 201, responseMessage: "Your message not Save" })
    //     else {
    //         res.send({ responseCode: 200, responseMessage: "Your message Saved successfully ", succ })
    //     }
    //   })
    // })    
}