var mongoose = require("mongoose");

var schema = mongoose.Schema;
var meta = new schema({
    page: {
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

module.exports = mongoose.model("metaTagData",meta);
