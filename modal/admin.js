var mongoose = require("mongoose");
var schema = mongoose.Schema;
var admins = new schema({
	name: {
		type: String,
		default: "admin",
	},
	email: {
		type: String,
		unique:true,
        default: "js362676@gmail.com",
	},
	phone: {
		type: Number,
	},
	pass: {
		type: String,
		default:"admin",
	},
	otpEmailStatus: {
        type: String,
        default: 'notChecked',
    },
    otp: {
        type: String,
    },
	});

module.exports = mongoose.model("adminData",admins);


// var mongoose = require("mongoose");
// var schema = mongoose.Schema;
// var admins = new schema({
// 	admnName: {
// 		type: String,
// 		required: true
// 	},
// 	email: {
// 		type: String,
// 		unique:true,

// 	},
// 	phone: {
// 		type: Number,
// 		required: true
// 	},
// 	pswd: {
// 		type: String,
// 		required: true
// 	}
// 	});

// module.exports = mongoose.model("adminData",admins);
