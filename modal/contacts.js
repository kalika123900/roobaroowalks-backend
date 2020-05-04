var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var contacts = new schema({
	titleName: {
		type: String,
		// required: true
	},
	email: {
		type: String,
		// unique:true,        
	},
	phone: {
		type: Number
    },
    address: {
		type: String
		       
    },
    website: {
		type: String
	     
    },
    facebookLink:{
        type:String
    },
    twitter:{
        type:String
    } ,
    instagram:{
        type:String
    },
    workingDays:{
        type:String
    },
    workingTime:{
        type:String
    },
    userQuery:[{
            userName:{
                type:String
            },
            userEmail:{
                type:String
            },
            userSubject:{
                type:String
            },
            userMessage:{
                type:String
            }
    }],
    ourOffice:[{
            officeTitle :{
                type:String
            },
            officeImage:{
                type:String
            },
            officeDescription:{
                type:String
            }
    }]
	});

//module.exports = mongoose.model("contactUs",contacts);
contact = mongoose.model('contactUs', contacts, 'contactUs');
    module.exports =contact;

function init() {
       console.log("calling function of career")
        contact.findOne({}, (error, success) => {
            if (error) {
                console.log(error)
            } else {
                if (success === null) {
                    new contact({
                        titleName:"Demo",
                        email:"Demo desc",
                        phone: 8888889999,
                        address:"Demo left",
                        leftsubTitle:"degfshg",
                        leftDescription:"fhfsfs",
                        leftImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                        rightTitle:"sddhgsajd",
                        rightsubTitle:"sdsagds",
                        rightDescription:"gsaghdhg",
                        rightImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg"


    
    
    
                    }).save((error, success) => {
                        //console.log("Successfully Added Career Content",success)
                    })
    
                }
            }
        })
    }
    
    init();