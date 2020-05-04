var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var signs = new schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique:true,        
	},
	phone: {
		type: Number,
	},
	password: {
		type: String,
		required: true
	},
	otp: {
		type: String,
	}
	});

module.exports = mongoose.model("sign",signs);


