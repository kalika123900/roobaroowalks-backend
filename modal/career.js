var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var career = new schema({
	titleCareer: {
        type: String
	},
	description:{
        type:"String"      
    },
    bannerImage: {
        type: String    
    },
    leftTitle:{
        type:String
    },
    leftsubTitle:{
        type:String  
    } ,
    leftDescription:{
        type:String   
    },
    leftImage:{
        type:String    
    },
    rightTitle:{
        type:String    
    },
    rightsubTitle1:{
        type:String    
    },
    rightsubTitle2:{
        type:String    
    },
    rightDescription1:{
        type:String    
    },
    rightDescription2:{
        type:String    
    },
	rightImage:{
        type:String 
    },
    cards: [{
        image:{
            type:String
        },
        title:{
            type:String
        },
        description:{
            type:String
        }
    }],
    joinUs:[{
            name:{
                type:String
            },
            email:{
                type:String
            },
            city:{
                type:String
            },
            contribute:{
                type:String
            }
    }],
	});

    Career = mongoose.model('career', career, 'career');
    module.exports =Career;

    function init() {
       console.log("calling function of career")
        Career.findOne({}, (error, success) => {
            if (error) {
                console.log(error)
            } else {
                if (success === null) {
                    new Career({
                        titleCareer:"Demo",
                        description:"Demo desc",
                        bannerImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                        leftTitle:"Demo left",
                        leftsubTitle:"degfshg",
                        leftDescription:"fhfsfs",
                        leftImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                        rightTitle:"sddhgsajd",
                        rightsubTitle1:"sdsagds",
                        rightsubTitle2: "hhhhhh",
                        rightDescription1:"ggdgg  hhhh",
                        rightDescription2:"gsaghdhg",
                        rightImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg"
    
                    }).save((error, success) => {
                        //console.log("Successfully Added Career Content",success)
                    })
    
                }
            }
        })
    }
    
    init();