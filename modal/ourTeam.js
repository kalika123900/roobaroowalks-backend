var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var team = new schema({
	name: {
		type: String,
		// required: true
	},
    title: {
		type: String,
	},
    description: {
		type: String
	     
    },
    profileImage:{
        type:String
    },
    facebookLink:{
        type:String
    },
    twitterLink:{
        type:String
    },
    instaLink:{
        type:String
    },
    email:{
    	type:String
    }
   
	
	});

module.exports = mongoose.model("ourTeam",team);



























