var mongoose = require("mongoose");
var schema = mongoose.Schema;
var guestBook = new schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    noOfTravlers:{
        type: Number,
    },
    phone:{
        type: Number,
    },
    tourType:{
        type: String,
    },
    city:{
        type: String,
    },
    from: {
        type:String,
    },
    to:{
        type: String,
    },
    preference:{
        type: String,
    }
});
module.exports = mongoose.model("guestBooks",guestBook);