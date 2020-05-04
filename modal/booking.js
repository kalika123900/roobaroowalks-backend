var mongoose = require("mongoose");
var schema = mongoose.Schema;
var booking = new schema({
    // cartId:{
    //     type:schema.Types.ObjectId,
    //     ref:"cartData"
    // },
    paymentId:{
        type: String
    },
    createdAt:{
        type : String,
        default:Date.now,
    },
    amount:{
        type : String,
        default:Date.now,
    },
    userId:{
        type: String,
    },
    orderedBooking:[]

    
});
module.exports = mongoose.model("bookingData",booking);