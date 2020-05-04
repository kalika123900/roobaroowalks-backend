var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');


var schema = mongoose.Schema;
var guide = new schema({
    cityId: {
        type: String,
        //required: true
    },
    cityName: {
        type: String,
        //required: true
    },
    name: {
        type: String,
        // unique: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
        //required: true
    },
    image: {
        type: String,
    },

    facebookLink: {
        type: String,

    },
    twitterLink: {
        type: String
    },
    instaLink: {
        type: String

    },

});
guide.plugin(mongoosePaginate);
module.exports = mongoose.model("guideData",guide);