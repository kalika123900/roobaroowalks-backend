var mongoose = require("mongoose");

var schema = mongoose.Schema;
var metaBlog = new schema({
    blog: {
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

module.exports = mongoose.model("metaTagBlogData",metaBlog);