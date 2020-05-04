var mongoose = require("mongoose");

var schema = mongoose.Schema;
var metaWalk = new schema({
    walk: {
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

module.exports = mongoose.model("metaTagWalkData",metaWalk);