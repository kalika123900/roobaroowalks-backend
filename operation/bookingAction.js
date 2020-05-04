var bokngDb = require("../modal/booking");
let nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
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
function sendMail(email,obj){
    var details = {
        from: 'roobaroobackend@gmail.com', // sender address same as above
        to: email,                  // Receiver's email id
        subject: 'Guide Confirmation', // Subject of the mail.
        html: '<div><span>Dear User,</span><div><p>Thank you for use roobaroo.</p><br><p>Important: If this email is in your Spam folder mark it as "Not Spam" first.</p><br></br><p>Your guide has been assigned on your booking.</p><br><p>Guide Name - '+obj.name+'</p><br><p>Guide City- '+obj.cityName+'</p><br><p>Guide Id - '+obj._id+'</p><br><p>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/roobaroo.in) or follow us on Twitter (@roobaroo).</p><br><p>Once again, thank you for updatation in roobaroo. We look forward to working with you.</p></div><span>Best Regards</span><br><span>Roobaroo Team</span><br><u>https://www.roobaroowalks.com</u><div>'     };
    transporter.sendMail(details, function (error, data) {
        if(error){

        }
        else {

        } 
        });
    }
    function syntaxHighlight(json) {
      json = JSON.stringify(json, undefined, 4);
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key';
              } else {
                  cls = 'string';
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean';
          } else if (/null/.test(match)) {
              cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
      });
  }
  
    function sentMailAdmin(email,booking){
      var bookingData = booking[0];
      var bookingAll = booking;
      var details = {
          from: 'bookings@roobaroowalks.com', // sender address same as above
          to: 'bookings@roobaroowalks.com',
          cc: 'kalika.mongoosetech@gmail.com', 
          subject: 'New Confirmed Booking Received', // Subject of the mail.
          html: '<style>pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }.string { color: green; }.number { color: darkorange; }.boolean { color: blue; } .null { color: magenta; }.key { color: red; }</style><div><span>Dear Admin,</span><div><p>We have got a new booking from '+bookingData.fullName+' ('+email+') for '+bookingData.walkNme+' and received payment of amount '+bookingData.totalPrice+'. <br/> Total No of Traveller/s - '+bookingData.noofTraveller+' <br/> Booking Phone Number : '+bookingData.bokingPhone+'</p><p>*This is a system generated Email, Please verify in admin area!</p><br/><strong>Please find the data details :</strong><br/><pre>'+syntaxHighlight(bookingAll)+'</pre></div><span>Best Regards</span><br><span>Roobaroo Team</span><br><u>https://www.roobaroowalks.com</u></div>'     };
          transporter.sendMail(details, function (error, data) {
                if(error){
        
                }
                else{
                  
                }
                });
            }
    function sendMailRegis(email,cst){
    var details = {
        from: 'bookings@roobaroowalks.com', // sender address same as above
        to: email,                  // Receiver's email id
        subject: 'Booking Confirmation ', // Subject of the mail.
        html: '<div><span>Dear User,</span><div><p>Thank you for booking with us. We will get back to you with the details shortly.<br/><br/><b>Important</b>: If this email is in your Spam folder mark it as "Not Spam" first.<br/><br/>You have booked your walk with advanvce payment of rupees- '+cst+'. <br/><br/>If you have any questions or require assistance please click here to contact us. To receive our latest updates and freebies, like us on Facebook (facebook.com/roobaroo.in) or follow us on Twitter (@roobaroo).<br/><br/>Once again, thank you for updatation in Roobaroo Walks.  Looking forward to hosting you :)</p></div><span>Best Regards</span><br><span>Roobaroo Team</span><br><u>https://www.roobaroowalks.com</u><div>'};
   transporter.sendMail(details, function (error, data) {
        if(error){

        }
        else{
          
        }
        });
    }

module.exports.bookingRegist=function(req,res){
    var bokngregist = new bokngDb(req.body)
    bokngregist.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
         let cost = req.body.orderedBooking[0].totalPrice;
         sendMailRegis(req.body.orderedBooking[0].bookingEmail,cost) 
         sentMailAdmin(req.body.orderedBooking[0].bookingEmail,req.body.orderedBooking);
        res.send({"responseCode":200,"responseMessage":"Booking successfully added."})
      }   
    })
}

module.exports.getBookingById=function(req,res){
    bokngDb.find({userId: req.body.userId}).exec((err,succ)=>{ 
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Booking successfully found.",lists: succ})
      }      
    })
}

module.exports.getBooking=function(req,res){
    bokngDb.find().exec((err,succ)=>{ 
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Booking successfully found.",lists: succ})
      }      
    })
}

module.exports.search_booking =function(req,res){
   bokngDb.find({"travellerName": {$in: [ /xd/, /sd/, /ad/ ] }}).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Booking successfully found.",data: succ})
       }
   })
}
module.exports.deleteOrder=function(req,res){
    bokngDb.updateOne(
  {_id: req.body.orderId,userId:req.body.userId,"orderedBooking._id":req.body.cartId },
  { $set: { "orderedBooking.$.orderStatus" : "cancelled" } }).exec((err,succ)=>{ 
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Booking successfully found.",lists: succ})
      }      
    })
}
module.exports.ordered_details=function(req,res){
    bokngDb.find({_id: req.body.orderId}).exec((err,succ)=>{ 
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Orders successfully found.",lists: succ})
      }      
    })
}

module.exports.deleteBooking=function(req,res){
    bokngDb.deleteOne({_id: req.body.orderId}).exec((err,succ)=>{ 
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Booking successfully found.",lists: succ})
      }      
    })
}

module.exports.editBooking=function(req,res){  
     bokngDb.update({_id: req.body._id},req.body).exec((err,data)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Some internal error occured. Please try after sometime."})
        } else{
            res.send({"responseCode":200,"responseMessage":"Booking successfully updated."})
        }
    })
   }

module.exports.wlkNmSrch =function(req,res){
    bokngDb.aggregate([{"$match":{"$or":[{"orderedBooking.walkNme":{ "$regex": req.body.srch_guide , $options: '$i' }}]}}]).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Booking successfully found.",data: succ})
       }
   })
}


module.exports.dateSrch =function(req,res){
    bokngDb.aggregate([{"$match":{"$or":[{"orderedBooking.bookingDate":{ "$regex": req.body.srch_date , $options: '$i' }}]}}]).exec(function(err,succ){
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
        
           res.send({"responseCode":200,"responseMessage":"Booking successfully found.",data: succ})
       }
   })
}

module.exports.asinGuideWlkNm=function(req,res){
    bokngDb.updateMany({"orderedBooking.walkNme":req.body.walkName},{ $set: { "orderedBooking.$.assignedGuide":req.body.guidData}}).exec((err,succ)=>{ 
        if(err){
            res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else{
         bokngDb.aggregate([{"$match":{"$or":[{"orderedBooking.walkNme":req.body.walkName}]}}]).exec(function(err,succ){
            for(let i = 0; i < succ.length; i++){
 let info = req.body.guidData
                sendMail(succ[i].orderedBooking[0].bookingEmail,info)     
            res.send({"responseCode":200,"responseMessage":"Guide has been assigned on the walk."})
   }
   })  

  }
})
}


  


