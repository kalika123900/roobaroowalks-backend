var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');


var schema = mongoose.Schema;
var walk = new schema({
    addmoreimagesofWalk: [{
        clientImage: {
            type: String
        }
    }],
    cityId: {
        type: String,
        //required: true
    },
    cityName:{
       type: String,
    },
    walkName: {
        type: String,
        // unique: true,
    },
    walkCategory: {
        type: String,
        // enum:["walkTour","foodExperience","culturalActivity"]
    },
    groupPrice: {
        type: Number,
        //required: true
    },
    privategroupPrice: {
        type: Number,
        // required: true
    },

    shortDesc: {
        type: String,

    },
    coverImage: {
        type: String
    },
    walkVideo: {
        type: String
    },
    detailsonPage: {
        type: String
    },
    expHighlight: {
        type: String
    },
    expDesc: {
        type: String
    },

    fullDesc: {
        type: String
    },
    includesDesc: {
        type: String
    },
    knowbeforeyougoDesc: {
        type: String
    },
    walkTime: {
        type: String

    },
    walkDuration: {
        type: String
    },
    totalSlot: {
        type: Number
    },
    minimumbookingRequire: {
        type: Number
    },
    feedbackData:[{
        slectWalkName: String, 
        title: String,    
        desc: String,
        client_img: String,
        }],
    client_imgs: {
        type: [String],
        // required: true
    },


});
walk.plugin(mongoosePaginate);
module.exports = mongoose.model("walkData",walk);