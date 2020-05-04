var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

var schema = mongoose.Schema;
var category = new schema({
    category: String,

});
category.plugin(mongoosePaginate);
module.exports = mongoose.model("categoryData",category);