var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var instas = new schema({
    insta_imgs:{
            type: String
        	   }
	});

module.exports = mongoose.model("instaData",instas);