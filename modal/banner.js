var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var banners = new schema({
	banrTitle: {
		type: String,
		// required: true
	},
	banrDescrptn: {
		type: String,
		// unique:true,    
	},
	banrImgs: {
		type: String,
		// required: true
	},
	imgs: {
		type: String,
		// required: true
	},
	title: {
		type: String,
		// required: true
	}
	});

module.exports = mongoose.model("banrData",banners);


