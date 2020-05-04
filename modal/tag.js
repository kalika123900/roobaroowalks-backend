var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema;
var tag = new schema({
    tagData: String,

});
tag.plugin(mongoosePaginate);
module.exports = mongoose.model("tag_Data",tag);