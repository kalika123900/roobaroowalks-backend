module.exports.contactRequest = (req, res) => {
    const userInfo = `
      <p>Contact Us (Roobaroo Walks)</p>
      <h3>Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.msg}</li>
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
          subject: "Contact Us request", // Subject line
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
  
}