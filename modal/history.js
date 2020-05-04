var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var history = new schema({
	title: {
        type: String
	},
	description:{
        type:"String"      
    },
    bannerImage: {
        type: String    
    },
    contentTitle:{
        type:String
    },
    contentDescription:{
        type:String  
    } ,
    footerDescription:{
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
    
	});

    History = mongoose.model('history', history, 'history');
    module.exports =History;

    function init() {
       console.log("calling function of career")
        History.findOne({}, (error, success) => {
            if (error) {
                console.log(error)
            } else {
                if (success === null) {
                    new History({
                        title:"Demo",
                        description:"Demo desc",
                        bannerImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                        contentTitle:"Demo left",
                        contentDescription:"degfshg",
                        footerDescription:"fhfsfs",
                       }).save((error, success) => {
                        //console.log("Successfully Added Career Content",success)
                    })
    
                }
            }
        })
    }
    
    init();