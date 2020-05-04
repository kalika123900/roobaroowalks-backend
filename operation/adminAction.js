var booking = require("../modal/addToCart")
var walk=require("../modal/walk");
var mongoosePaginate = require('mongoose-paginate');
var mongoose = require("mongoose")

// File change on 19-07-2019 for admin login functionality

var adminDb = require("../modal/admin")
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'nobilliotechnologies@gmail.com', //email ID
        pass: 'Nobillio123' //Password
    }
});
function sendMail(email){
    var passs = Math.floor(1000 + Math.random() * 9000);
    var val = passs+"@Roobaroo";
    var details = {
        from: 'roobaroobackend@gmail.com', // sender address same as above
        to: email,                  // Receiver's email id
        subject: 'Roobaroo', // Subject of the mail.
        html: '<div><h3>Dear Users</h3><div><p>your New password is  - "'+val+'".</div><div>'                   // Sending OTP
    };
    transporter.sendMail(details, function (error, data) {
        if(error)
            console.log(error)
        else
             adminDb.updateOne({email: email},{pass:val}).exec((err,succ)=>{
                console.log("send password==>"+succ);
             })

        });
    }

    function sendMailOtp(email){
    var val = Math.floor(1000 + Math.random() * 9000);
    var details = {
        from: 'nobilliotechnologies@gmail.com', // sender address same as above
        to: email,                  // Receiver's email id
        subject: 'Roobaroo', // Subject of the mail.
        html: '<div><h3>Dear Users</h3><div><p>your Otp is  - "'+val+'".</div><div>'                   // Sending OTP
    };
    transporter.sendMail(details, function (error, data) {
        if(error)
            console.log(error)
        else
             adminDb.updateOne({},{email:email, otp:val}).exec((err,succ)=>{
                console.log("send password==>"+succ);
             })

        });
    }

// File change on 19-07-2019 for admin login functionality


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

    module.exports.addWalks = function (req, res) {
        if(!req.body.coverImage){
            res.send({"responseCode":400,"responseMessage":"Cover Image is missing"})
        }
        else{
        var data = req.body.coverImage
        imageUploadToCloudinary(data, (resultCloud, err) => {
            //console.log('coverImage ===>', err, resultCloud);
            req.body.coverImage= resultCloud;
            var walks = new walk(req.body);

            walks.save((err, result) => {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
                }
                else if (!result)
                    res.send({ responseCode: 201, responseMessage: "walk not save" })
                else {
                    res.send({ responseCode: 200, responseMessage: "walks added successfully", result })
                }

            })
        })
    }
    },

    module.exports.editWalks = function (req, res) {
        if(!req.body.coverImage){
            res.send({"responseCode":400,"responseMessage":"Cover Image is missing"})
        }

else{

        var data = req.body.coverImage
        imageUploadToCloudinary(data, (resultCloud, err) => {
            //console.log('coverImage ===>', err, resultCloud);
            req.body.coverImage= resultCloud;
            walk.update({_id:req.body._id},req.body,(err, result) => {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
                }
                else if (!result)
                    res.send({ responseCode: 201, responseMessage: "walk not save" })
                else {
                    res.send({ responseCode: 200, responseMessage: "walks added successfully", result })
                }

            })
        })
    }
    },


    module.exports.getWalks = (req, res) => {
        walk.find({}, (err, result) => {
            if (err)
            res.send({"responseCode": 400, "responseMessage": "Internal server error.", err })
            else if (!result)
            res.send({"responseCode": 201, "responseMessage": "Walk not Found" })
            else if (result)
                res.send({"responseCode": 200, "responseMessage": "Walk Found successfully",result })
        })
    }

    module.exports.getWalkByCategory = (req, res) => {
        walk.find({cityId:req.body.cityId,walkCategory:req.body.walkCategory}, (err, result) => {
            if (err)
            res.send({"responseCode": 400, "responseMessage": "Internal server error.", err })
            else if (!result)
            res.send({"responseCode": 201, "responseMessage": "Walk not Found" })
            else if (result)
                res.send({"responseCode": 200, "responseMessage": "Walk Found successfully",result })
        })
    }

    module.exports.getWalkByCity = (req, res) => {
        walk.find({cityId:req.body.cityId}, (err, result) => {
            if (err)
            res.send({"responseCode": 400, "responseMessage": "Internal server error.", err })
            else if (!result)
            res.send({"responseCode": 201, "responseMessage": "Walk not Found" })
            else if (result)
                console.log(result)
                res.send({"responseCode": 200, "responseMessage": "Walk Found successfully",result })
        })
    }


module.exports.getwalkDetails = (req, res) => {
    if (!req.params.id)
        res.send({ "responsecode": 400, "responseMessage": "Please provide the required value" })
    walk.findOne({ _id: req.params.id }, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Invalid Walk" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No walk found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Details of Walks", result })
    })
}

module.exports.addWalk_feedback =function(req,res){
    let feedbackdata=[];
    walk.findOne({_id: req.body.walkId,cityId: req.body.cityId},{feedbackData:1}).exec((error,data)=>{
              // console.log("====>>"+JSON.stringify(data));
        feedbackdata= data.feedbackData;
        cloudinary.uploader.upload(req.body.client_img, function(result) {
              req.body.client_img=result.url

        feedbackdata.push({"slectWalkName":req.body.slectWalkName,"title":req.body.title,"desc":req.body.desc,"client_img":req.body.client_img});
      // console.log("comment====>>"+JSON.stringify(data));
      walk.update({_id: req.body.walkId,cityId: req.body.cityId},{feedbackData: feedbackdata},function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Walk feedback successfully added."})
      }
    })
})

    });
}

module.exports.get_walkFeedback =function(req,res){
    walk.find({cityId:req.body.cityId,_id: req.body.walkId},{feedbackData:1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Feedback doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Feedback lists are displayed successfully.","feedbck": data})
        }
 })
}

module.exports.edit_walkFeedback = function (req, res) {
    walk.findOne({_id: req.body.walkId},{feedbackData:1}).exec((error,data)=>{
       cloudinary.uploader.upload(req.body.newFeedback.client_img, function(result3) {
                    req.body.newFeedback.client_img= result3.url;
      let tempData= data.feedbackData
      let index= tempData.findIndex(function(item,index){
        return (item._id==req.body.newFeedback._id)
      })
      tempData.splice(index,1,req.body.newFeedback);
      walk.updateMany({_id: req.body.walkId},{feedbackData: tempData},(error,succ)=>{
        if (error) {
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
        }
        else if (!succ)
            res.send({ responseCode: 201, responseMessage: "Your message not Save" })
        else {
            res.send({ responseCode: 200, responseMessage: "Your message Saved successfully ", succ })
        }
    })
      // })
  // })
     })
    })
}



module.exports.deleteWalks = (req, res) => {
    if (!req.body.id)
        res.send({ "responsecode": 400, "responseMessage": "Please provide the required value" })
    walk.findOneAndDelete({ _id: req.body.id }, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Invalid Walk" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No walk found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Walks Deleted Successfully", result })
    })
}


module.exports.addToCart=function(req,res){
    var bookingRegis = new booking(req.body)
    bookingRegis.save(function(err,succ){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Booking successfully initiated."})
      }
    })
}

module.exports.addbookingDetails=function(req,res){
    booking.update({walkId: req.body.walkId,bookingDate: req.body.bookingDate},req.body).exec((err,succ)=>{
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Booking details successfully added."})
      }
    })
}

module.exports.getcartItem = (req, res) => {
    booking.find({userId:req.body.userId}, (err, result) => {
        if (err)
        res.send({"responseCode": 400, "responseMessage": "Internal server error.", err })
        else if (!result)
        res.send({"responseCode": 201, "responseMessage": "No Booking Available" })
        else if (result)
            res.send({"responseCode": 200, "responseMessage": "Booking Found successfully",result })
    })
}
module.exports.clearUserCart = (req,res) => {
    booking.remove({userId:req.body.userId}, (err, result) => {
        if (err)
        res.send({"responseCode": 400, "responseMessage": "Internal server error.", err })
        else if (!result)
        res.send({"responseCode": 201, "responseMessage": "No Delete Happened" })
        else if (result)
            res.send({"responseCode": 200, "responseMessage": "Deleted all Records",result })
    })
}
module.exports.delete_cartItems=function(req,res){
    booking.deleteOne({_id:req.body.cartId}).exec((err,data)=>{
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Item successfully deleted."})
        }
    })
}

module.exports.getbookingDetails = (req, res) => {
    if (!req.params.id)
        res.send({ "responsecode": 400, "responseMessage": "Please provide the required value" })
    booking.findOne({ _id: req.params.id }, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Invalid booking" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No booking found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Details of Booking", result })
    })
}

module.exports.search_walk =function(req,res){
   walk.find({walkName : { $regex: req.body.srchWlkNme , $options: '$i' } }).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Walk successfully found.",data: succ})
       }
   })
}

module.exports.addmoreimagesofWalk = function (req, res) {
    if (!req.body.clientImage) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.clientImage
    cloudinary.uploader.upload(data, function (result) {
        req.body.clientImage = result.url
        walk.find().exec(function (error, data) {
            let tempData = data[0].addmoreimagesofWalk;

            tempData.push({clientImage:req.body.clientImage})

            walk.update({ _id: data[0]._id }, { addmoreimagesofWalk: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Image not added" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Images added Successfully", succ })
                }

            })
        })
    })
}

module.exports.addWalk_feedback =function(req,res){
    let feedbackdata=[];
    walk.findOne({_id: req.body.walkId,cityId: req.body.cityId},{feedbackData:1}).exec((error,data)=>{
              // console.log("====>>"+JSON.stringify(data));
        feedbackdata= data.feedbackData;
        cloudinary.uploader.upload(req.body.client_img, function(result) {
              req.body.client_img=result.url
        feedbackdata.push({"slectWalkName":req.body.slectWalkName,"title":req.body.title,"desc":req.body.desc,"client_img":req.body.client_img});
      walk.update({_id: req.body.walkId,cityId: req.body.cityId},{feedbackData: feedbackdata},function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Walk feedback successfully added."})
      }
    })
})

    });
}

module.exports.get_walkFeedback =function(req,res){
    walk.find({cityId:req.body.cityId,_id: req.body.walkId},{feedbackData:1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Feedback doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Feedback lists are displayed successfully.","feedbck": data})

        }
 })
}



module.exports.delete_walkFeedback=function(req,res){
    walk.findOneAndUpdate({cityId:req.body.cityId,_id: req.body.walkId},{
      $pull: {
                "feedbackData": { "_id": req.body.feedbckId }
            }}).exec((error,data)=>{
        if(error){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Feedback successfully deleted."})
        }
    })
}

module.exports.search_walkFeedback =function(req,res){
   walk.find({walkName : { $regex: req.body.srchWalk , $options: '$i' } }).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Feedback successfully found.",data: succ})
       }
   })
}

module.exports.addMore_clientImgs =function(req,res){
    let client_imgs=[];
    walk.findOne({cityId:req.body.cityId,_id: req.body.walkId},{client_imgs:1}).exec((error,data)=>{
      cloudinary.uploader.upload(req.body.client_imgs, function(result3) {
                    req.body.client_imgs= result3.url;
      // let tempData= result[0].client_imgs
        client_imgs= data.client_imgs;
        client_imgs.push(req.body.client_imgs);
      walk.update({cityId:req.body.cityId,_id: req.body.walkId},{client_imgs: client_imgs},function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Client images successfully added."})
      }
    })
    });
    })
}

module.exports.get_clientImg =function(req,res){
    walk.find().exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Client images doesn't exist."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Client images lists are displayed successfully.","clientImgLists": data})

        }
 })
}

module.exports.editMore_clientImgs = function (req, res) {
    let client_imgs = [];
    // cloudinary.uploader.upload(req.body.client_imgs, function (result3) {
    //     req.body.client_imgs = result3.url;

            walk.update({_id:req.body.walkId}, { client_imgs: req.body.client_imgs }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ "responseCode": 201, "responseMessage": "Client Image not updated" })
                else {
                    res.send({ "responseCode": 200, "responseMessage": " Client Image updated Successfully", succ })
                }

            })
        //})
}


// new functions for admin login 19-07-19


module.exports.userSignUp =function(req,res){
  if(req.body.name=='' || req.body.name==undefined || ((req.body.email=='' || req.body.email==undefined) && (req.body.phone=='' || req.body.phone==undefined)) || req.body.password=='' || req.body.password==undefined){
    res.send({"responseCode":400,"responseMessage":"Fields cannot be empty."})
  } else{

       // cloudinary.uploader.upload(req.body.profilePicture, function(result) {
       // console.log("image===>>"+JSON.stringify(result));
        // req.body.profilePicture = result.url;
        // console.log("req_body1===>>"+JSON.stringify(req.body));

 var signupRegist = new signDb(req.body)

    signupRegist.save(function(err,succ){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Your credentials already exists."})
        } else{
             signDb.findOne({email: req.body.email},{_id:1}).exec(function(err,data){
              res.send({"responseCode":200,"responseMessage":"User successfully registered.","data":{"userId": data._id}})
             });
        }
    })

}
}

module.exports.adminLogin =function(req,res){
  if(req.body.username=='' || req.body.username==undefined || req.body.password=='' || req.body.password==undefined){
    res.send({"responseCode":400,"responseMessage":"Fields cannot be empty."})
  } else{
    adminDb.findOne({email: req.body.username,pass:req.body.password}).exec(function(err,data){
            if(data == null){
            res.send({"responseCode":401,"responseMessage":"User is not registered with this credentials."})
            } else {
            res.send({"responseCode":200,"responseMessage":"login successfull.","data":{"user": data}})
            }
        })
    }
}



module.exports.adminChangePswd=function(req,res){
       adminDb.findOne({}, { email: 1 }).exec((err, data) => {
        let email = data.email;
         sendMail(email)
         res.send({"responseCode":200,"responseMessage":"Password Send successfully at registered EmailId."})
        })
    }



module.exports.forgotPassword = function(req, res) {
    console.log("body====>>" + JSON.stringify(req.body))
    adminDb.findOne({}, { email: 1 }).exec((err, data) => {
        console.log("data====>>" + JSON.stringify(data.email))
        console.log("err====>>" + JSON.stringify(err))
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Please check all the fields." })
        } else if (data == null) {
            res.send({ "responseCode": 400, "responseMessage": "Email id does not exist." })
        } else {
            sendMailOtp(data.email)
            res.send({ "responseCode": 200, "responseMessage": "OTP has been sent to your registered email id.",data })
        }
    })
}



module.exports.verifyOtp = function(req, res) {
    console.log("body====>>" + JSON.stringify(req.body))
    adminDb.findOne({}, {otp: 1, otpEmailStatus: 1 }).exec((err, data) => {
        console.log("data====>>" + JSON.stringify(data))
        console.log("err====>>" + JSON.stringify(err))
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Please check all the fields." })
        } else {
            if (data.otp == req.body.otp) {
                adminDb.update({}, { otpEmailStatus: "checked" }).exec((err, dataaa) => {
                    res.send({ "responseCode": 200, "responseMessage": "Your otp has been verified successfully.", dataaa })
                })
            } else {
                res.send({ "responseCode": 400, "responseMessage": "Your otp is not valid." })
            }
        }
    })
}


module.exports.updateAdminPass = function(req, res) {
    console.log("body====>>" + JSON.stringify(req.body))
    adminDb.findOne({}, {otpEmailStatus: 1, pass:1 }).exec((err, data) => {
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Please check all the fields." })
        } else {
            if (data.otpEmailStatus == "checked") {
                adminDb.update({}, { pass: req.body.NewPassword }).exec((err, dataaa) => {
                    res.send({ "responseCode": 200, "responseMessage": "Your Password has been successfully Updated.", data })
                })
            } else {
                res.send({ "responseCode": 400, "responseMessage": "Your otp is not verified." })
            }
        }
    })
}


module.exports.getProfile = function(req, res) {
    console.log("body====>>" + JSON.stringify(req.body))
    adminDb.find({},{_id:0,name:1, pass:1, email:1}).exec(function(err, data) {
        console.log("data====>>" + JSON.stringify(data))
        console.log("err====>>" + JSON.stringify(err))
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "This profile doesn't exist." })
        } else {
            res.send({ "responseCode": 200, "responseMessage": "Admin Profile found.", "profile": data })

        }
    })
}

module.exports.editProfile=function(req,res){
    console.log("body====>>"+JSON.stringify(req.body))
    adminDb.updateOne({},{name:req.body.name, email:req.body.email, pass:req.body.pass}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Profile successfully updated."})
        }
    })
}

module.exports.register=function(req,res){
    console.log("body====>>"+JSON.stringify(req.body))
    var save = new adminDb(req.body).save(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Profile successfully updated."})
        }
    })
}

// new functions for admin login 19-07-19
