var mongoose = require("mongoose");

var schema = mongoose.Schema;
var metaCity = new schema({
    city: {
        type: String,
        //required: true
    },
    title: {
      type: String,
    },
    metaTags: {
        type: String,
        //required: true
    },
});

module.exports = mongoose.model("metaTagCityData",metaCity);