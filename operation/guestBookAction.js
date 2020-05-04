var guest = require("../modal/guestBooking")


module.exports.guestBooking = (req, res) => {
  const userInfo = `
    <p>You have a new booking request</p>
    <h3>Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>No of travellers: ${req.body.noOfTravlers}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Tour type: ${req.body.tourType}</li>
      <li>City: ${req.body.city}</li>
      <li>From: ${req.body.from}</li>
      <li>To: ${req.body.to}</li>
      <li>Preferances: ${req.body.preference}</li>
    </ul>
  `;
   var from =  new Date(req.body.from);
   var to =  new Date(req.body.to);
   var fromDate = req.body.from;
   var toDate = req.body.to;
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
        from: '"'+req.body.name+'" <roobaroodev@gmail.com>', // sender address
        to: "bookings@roobaroowalks.com",
        replyTo: req.body.email,// list of receivers
        subject: req.body.noOfTravlers+' pax -'+ req.body.city+' - '+fromDate + ' to '+toDate, // Subject line
        // text: "Hello world?", // plain text body
        html: userInfo // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);


	    var guestCont = new guest(req.body)
        guestCont.save((err, result) => {
            if (err)
            res.send({"responseCode": 400, "responseMessage": "Internal server error.", err })
            else if (!result)
            res.send({"responseCode": 201, "responseMessage": "Walk not Found" })
            else if (result)
                res.send({"responseCode": 200, "responseMessage": "Walk Found successfully",result })
        })



}
