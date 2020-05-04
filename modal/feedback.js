var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var feedbacks = new schema({
	cityId: {
		type: String,
	},
	selctCity: {
		type: String,
	},
	title: {
		type: String,
	},
	desc:{
		type:String,
	},
	client_img: {
		type: String,
	},
	logo_img: {
		type: String,
	}
});

module.exports = mongoose.model("feedbackData",feedbacks);