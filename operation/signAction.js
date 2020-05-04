var signDb = require("../modal/sign");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'roobaroobackend@gmail.com',         //email ID
        pass: 'Stupefy7!'              //Password 
    }
});
function sendMail(email){
    var val = Math.floor(1000 + Math.random() * 9000);
    var details = {
        from: 'roobaroobackend@gmail.com', // sender address same as above
        to: email,                  // Receiver's email id
        subject: 'Roobaroo', // Subject of the mail.
        html: '<div><h3>Dear Users</h3><div><p>Please enter this OTP to recover your password - "'+val+'".</div><div>'                   // Sending OTP 
    };
    transporter.sendMail(details, function (error, data) {
        if(error)
            console.log(error)
        else
             signDb.updateOne({email: email},{otp:val}).exec((err,succ)=>{
                console.log("send password==>"+succ); 
             })
            
        });
    }



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

module.exports.userLogin =function(req,res){
  if(req.body.email=='' || req.body.email==undefined || req.body.password=='' || req.body.password==undefined){
    res.send({"responseCode":400,"responseMessage":"Fields cannot be empty."})
  } else{
    signDb.findOne({email: req.body.email},{_id:1,password:1}).exec(function(err,data){
        if(err){
            res.send({"responseCode":400,"responseMessage":"EmailId already exists."})
        } else{
            if(data == null){
            res.send({"responseCode":401,"responseMessage":"User is not registered with this credentials."})
            } else if(data.password!=req.body.password){
          res.send({"responseCode":401,"responseMessage":"Your password is incorrect."})
            } else {
            res.send({"responseCode":200,"responseMessage":"login successfull.","data":{"userId": data._id}})    
            }
        }
    })
  }
}




module.exports.recovrPswd=function(req,res){
   signDb.findOne({email: req.body.email},{_id:1,email:1}).exec(function(err,data){
       if(err){
            res.send({"responseCode":400,"responseMessage":"Something went wrong."})
        }
        else {
            sendMail(req.body.email);
           res.send({"responseCode":200,"responseMessage":"Password has been sent to your Email-Id."})
        }
   })
}


module.exports.userResetPswd=function(req,res){  
    signDb.findOne({email: req.body.email},{password:1}).exec((err,data)=>{
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else {
            if(data===null){
            res.send({"responseCode":400,"responseMessage":"Email-Id does not exist."})
        } else {
        signDb.updateOne({email: req.body.email},{password:req.body.newPassword}).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Some internal error occured. Please try after sometime."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Password successfully changed."})
        }
    })  
        }
    }
})
}


module.exports.getProfile=(req,res)=>{
    if(!req.body._id)
    res.send({"responseCode":400,"responseMessage":"Please provide the required field"})
    signDb.findOne({"_id":req.body._id},(err,result)=>{
        if(err)
        res.send({"responseCode":400,"responseMessage":"Something went wrong"})
        if(!result)
        res.send({"responseCode":404,"responseMessage":"No User Found"})
        if(result){
        res.send({"responseCode":200,"responseMessage":"Details of User",result})
        }
    })
}

module.exports.verifyOtp=(req,res)=>{
    signDb.findOne({"email":req.body.email},{otp:1}).exec((err,result)=>{
        if(err)
        res.send({"responseCode":400,"responseMessage":"Something went wrong"})
        if(!result)
        res.send({"responseCode":404,"responseMessage":"No User Found"})
        if(result){
            if(result.otp==req.body.otp){
               res.send({"responseCode":200,"responseMessage":"Your otp verified successfully."});
            } else{
                res.send({"responseCode":400,"responseMessage":"Please enter correct otp."}) 
            }
        }
    })
}

module.exports.editProfile=(req,res)=>{
    if(!req.body._id)
    res.send({"responseCode":400,"responseMessage":"Please provide the required field "})
    signDb.findByIdAndUpdate({
        _id: req.body._id
    }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                phone:req.body.phone,
               
            }
        }, {
            new: true
        }, (err, succ) => {
            if (err) {
               res.send({"responseCode":400,"responseMessage":"Something went wrong"})
            }
            else if (!succ)
                res.send({"responseCode":401,"responseMessage":"Invalid User"})
            else if (succ) {
               res.send({"responseCode": 200,"responseMessage":"User profile updated successfully ", succ})
            }
        })
}