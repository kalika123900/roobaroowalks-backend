var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');


var schema = mongoose.Schema;
var booking = new schema({
   

    //////////////////////////////////////booking detail model
    cityId: {
        type: String,
        //required: true
    },
    category:{
        type:String,
        enum:["walkTour","foodExperience","culturalActivity"]
    },
    fullName: {
        type: String
    },
    noofTraveller: {
        type: String
    },
    bookingEmail: {
        type: String
    },
    bokingPhone: {
        type: Number
    },
    orderStatus: {
        type:String,
        default:"Running"
    },
        
    bookingDetail: [{
        travellerName: {
            type: String
        },
        travellerAge: {
            type: Number
        }
    }],
    assignedGuide:[],
    detail: {
        type: String,
    },
    walkId: {
        type: String,
    },
    bookingDate: {
        type: String,
    },
    totalPrice: {
        type: String,
    },
    userId:{
        type: String,
    },
    cityName:{
        type: String,
    },
    walkNme:{
        type: String,
    },
    walkImage:{
        type: String,
    },
});
booking.plugin(mongoosePaginate);
module.exports = mongoose.model("cartData", booking);