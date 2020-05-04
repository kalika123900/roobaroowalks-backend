var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var story = new schema({
	title: {
		type: String,
		// required: true
	},

    description: {
		type: String
	     
    },
    image:{
        type:String
    }

    
   
	
	});

module.exports = mongoose.model("addStory",story);





