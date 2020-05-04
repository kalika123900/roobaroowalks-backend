var mongoose = require("mongoose");
var schema = mongoose.Schema;
var addCitys = new schema({
  ctyName: {
    type: String,
    // unique:true,
  },
  slug: {
    type: String,
  },
  ctyStatus: {
    type: String,
  },
  ctyImgs: {
    type: String,
    // unique:true,
  },
  ctyTitle: {
    type: String,
    // unique:true,
  },
  ctyDiscription: {
    type: String,
    // unique:true,
  },
  ctyBanner: {
    type: String,
    // unique:true,
  },
  keyPoint: [
    {
      keyTle: {
        type: String,
      },
      keyDesc: {
        type: String,
      },
      keyImgs: {
        type: String,
      },
    },
  ],
  appTitle: {
    type: String,
  },
  appDesc: {
    type: String,
  },
  appLink: {
    type: String,
  },
  appImage: {
    type: String,
  },
  ctyVideo: {
    type: String,
  },
});

module.exports = mongoose.model("addCityData", addCitys);
