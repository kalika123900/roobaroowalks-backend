var contact = require("../modal/contacts");
let nodemailer = require('nodemailer')
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});

sendEmail = (email, subject, message, html, cc, bcc, callback) => {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'roobaroobackend@gmail.com',         //email ID
            pass: 'Stupefy7!' 
        }
    })
    let messageObj = {
        from: 'roobaroobackend@gmail.com',
        to: "bookings@roobaroowalks.com",
        subject: subject,
        text: message, //"A sentence just to check the nodemailer",
        html: html, //"Click on this link to <a href=" + link + ">reset Password</a>",
        cc: cc,
        bcc: bcc
    }
    transporter.sendMail(messageObj, (err, info) => {
        if (err) {
            callback(null);
        } else {
            callback(null, info)
        }
    })
}


module.exports.addContact = function (req, res) {
    var details = new contact({
        titleName: req.body.titleName,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        facebookLink: req.body.facebookLink,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        workingDays: req.body.workingDays,
        workingTime: req.body.workingTime
    })

    details.save((err, result) => {
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
        }
        else if (!result)
            res.send({ responseCode: 201, responseMessage: "ContactUs not Save" })
        else {
            res.send({ responseCode: 200, responseMessage: "Contact Us Saved successfully ", result })
        }

    })

}


module.exports.getcontactDetail = (req, res) => {
    contact.find((err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Contact Details Found ", result })
    })
}


module.exports.getInTouch = function (req, res) {
    contact.find((err, result) => {
      let tempData= result[0].userQuery
      tempData.push(req.body);
      contact.update({_id:result[0]._id},{userQuery: tempData},(error,succ)=>{
        if (error) {
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
        }
        else if (!succ)
            res.send({ responseCode: 201, responseMessage: "Your message not Save" })
        else if(succ) {
           let html=`<h2 style="font-family:times new roman;">`;
        sendEmail(null,"Get in touch",html,null,null,null, (error1, sent) => {
            if(error1)
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", error1 })
            else if(!sent)
            res.send({ "responseCode": 401, "responseMessage": "Something went wrong.",error1 })
            else  {
                res.send({ "responseCode": 200, "responseMessage": "Your message sent Successfully.",sent })
            }
           

        })
        }
      })
    })    
}
module.exports.editContact = function (req, res) {
    contact.find((err, result) => {
        contact.update({_id: result[0]._id}, {$set: req.body},{new: true}, (err, succ) => {
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
}

module.exports.AddOurOffice = function (req, res) {
    contact.find((err, result) => {
       cloudinary.uploader.upload(req.body.officeImage, function(result3) {
                    req.body.officeImage= result3.url;
      let tempData= result[0].ourOffice
      tempData.push(req.body);
      contact.update({_id:result[0]._id},{ourOffice: tempData},(error,succ)=>{
        if (error) {
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
        }
        else if (!succ)
            res.send({ responseCode: 201, responseMessage: "Your message not Save" })
        else {
            res.send({ responseCode: 200, responseMessage: "Your message Saved successfully ", succ })
        }
      })
     })
    })    
}

module.exports.getOurOffice = function (req, res) {
    contact.find((err, result) => {
      let officeData= {"workingDays":result[0].workingDays,"workingTime":result[0].workingTime,"office":result[0].ourOffice};
        if (err) {
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
        }
        else if (!result){
            res.send({ "responseCode": 201, "responseMessage": "Your message not Save" })
        }
        else {
            res.send({ "responseCode": 200, "responseMessage": "Your message Saved successfully ", officeData})
        }
    })    
}
module.exports.delete_ourOffice=function(req,res){
    contact.findOneAndUpdate({},{
      $pull: {
                "ourOffice": { "_id": req.body.officeId }
            }}).exec((error,data)=>{
        if(error){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Office successfully deleted."})
        }
    })
}
module.exports.edit_ourOffice = function (req, res) {
    contact.find((err, result) => {
       cloudinary.uploader.upload(req.body.officeImage, function(result3) {
                    req.body.officeImage= result3.url;
      let tempData= result[0].ourOffice
      let index= tempData.findIndex(function(item,index){
        return (item._id==req.body._id)
      })
      tempData.splice(index,1,req.body);
      contact.update({_id:result[0]._id},{ourOffice: tempData},(error,succ)=>{
        if (error) {
            res.send({ "responseCode": 400, "responseMessage": "Internal server error.", err })
        }
        else if (!succ)
            res.send({ responseCode: 201, responseMessage: "Your message not Save" })
        else {
            res.send({ responseCode: 200, responseMessage: "Your message Saved successfully ", succ })
        }
      })
     })
    })    
}