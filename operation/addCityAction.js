var addCityDb = require("../modal/addCity");
var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dxxstikij",
  api_key: "321311861714116",
  api_secret: "Efjm85BxLaWKVwQ4yq-nfvwnlf8",
});

module.exports.addCitys = function (req, res) {
  if (
    req.body.ctyName == "" ||
    req.body.ctyName == undefined ||
    req.body.ctyImgs == "" ||
    req.body.ctyBanner == ""
  ) {
    res.send({ responseCode: 400, responseMessage: "Fields cannot be empty." });
  } else {
    cloudinary.uploader.upload(req.body.ctyImgs, function (result) {
      req.body.ctyImgs = result.url;
      cloudinary.uploader.upload(req.body.ctyBanner, function (resultbnr) {
        req.body.ctyBanner = resultbnr.url;
        cloudinary.uploader.upload(req.body.appImage, function (resultApp) {
          req.body.appImage = resultApp.url;
          if (req.body.keyPoint.length != 0) {
            for (let i = 0; i < req.body.keyPoint.length; i++) {
              if (req.body.keyPoint[i].keyImgs != "") {
                cloudinary.uploader.upload(
                  req.body.keyPoint[i].keyImgs,
                  function (result) {
                    req.body.keyPoint[i].keyImgs = result.url;
                    imgeConditn(req.body, res);
                  }
                );
              }
            }
          }
        });
      }); //imgeConditn(req.body,res);
    }); // }
  }
  function imgeConditn(body, res) {
    console.log("dddd1====>>" + JSON.stringify(body));
    var addctyregs = new addCityDb(body);
    addctyregs.save(function (err, succ) {
      console.log("dddd====>>" + JSON.stringify(err));
      if (err) {
        res.send({
          responseCode: 400,
          responseMessage: "Please check all the fields.",
        });
      } else {
        res.send({
          responseCode: 200,
          responseMessage: "City successfully added.",
          data: { ctyId: succ._id },
        });
      }
    });
  }
};

module.exports.editCitys = function (req, res) {
  cloudinary.uploader.upload(req.body.ctyImgs, function (result) {
    req.body.ctyImgs = result.url;
    cloudinary.uploader.upload(req.body.ctyBanner, function (result) {
      req.body.ctyBanner = result.url;
      cloudinary.uploader.upload(req.body.appImage, function (resultApp) {
        req.body.appImage = resultApp.url;
        if (req.body.keyPoint.length != 0) {
          let keyData = [];
          for (let i = 0; i < req.body.keyPoint.length; i++) {
            if (req.body.keyPoint[i].keyImgs != "") {
              cloudinary.uploader.upload(
                req.body.keyPoint[i].keyImgs,
                function (result) {
                  keyData.push({
                    keyTle: req.body.keyPoint[i].keyTle,
                    keyDesc: req.body.keyPoint[i].keyDesc,
                    keyImgs: result.url,
                  });
                  if (keyData.length === req.body.keyPoint.length) {
                    req.body.keyPoint = keyData;
                    addCityDb
                      .update({ _id: req.body._id }, req.body)
                      .exec(function (err, data) {
                        if (err) {
                          res.send({
                            responseCode: 400,
                            responseMessage: "City doesn't exist.",
                          });
                        } else {
                          res.send({
                            responseCode: 200,
                            responseMessage:
                              "City lists are displayed successfully.",
                            cityList: data,
                          });
                        }
                      });
                  }
                }
              );
            }
          }
        }
      });
    }); //imgeConditn(req.body,res);
  }); // }
  //}
};

module.exports.getdetailBySlug = function (req, res) {
  console.log(req.body.slug);
  addCityDb.find({ slug: req.body.slug }).exec(function (err, data) {
    if (err) {
      res.send({ responseCode: 400, responseMessage: "City doesn't exist." });
    } else {
      res.send({
        responseCode: 200,
        responseMessage: "City lists are displayed successfully.",
        cityList: data,
      });
    }
  });
};
module.exports.getdetailById = function (req, res) {
  addCityDb.find({ _id: req.body.cityId }).exec(function (err, data) {
    if (err) {
      res.send({ responseCode: 400, responseMessage: "City doesn't exist." });
    } else {
      res.send({
        responseCode: 200,
        responseMessage: "City lists are displayed successfully.",
        cityList: data,
      });
    }
  });
};

module.exports.deleteCitys = function (req, res) {
  addCityDb.deleteMany({ _id: req.body.cityId }).exec(function (err, data) {
    if (err) {
      res.send({ responseCode: 400, responseMessage: "City doesn't exist." });
    } else {
      res.send({
        responseCode: 200,
        responseMessage: "City lists are displayed successfully.",
        cityList: data,
      });
    }
  });
};

module.exports.getCity = function (req, res) {
  addCityDb.find().exec(function (err, data) {
    if (err) {
      res.send({ responseCode: 400, responseMessage: "City doesn't exist." });
    } else {
      res.send({
        responseCode: 200,
        responseMessage: "City lists are displayed successfully.",
        cityList: data,
      });
    }
  });
};

module.exports.addBannrDetl = function (req, res) {
  if (req.body.bnrImgs == "") {
    imgeConditn(req.body, res);
  } else if (req.body.bnrImgs != "") {
    cloudinary.uploader.upload(req.body.bnrImgs, function (result) {
      req.body.bnrImgs = result.url;
      imgeConditn(req.body, res);
      // }
    });
    // }
  }

  function imgeConditn(body, res) {
    var ctyDetlReg = new ctyDetlDb(body);
    ctyDetlReg.save(function (err, succ) {
      if (err) {
        res.send({
          responseCode: 400,
          responseMessage: "Please check all the fields.",
        });
      } else {
        ctyDetlDb
          .update(
            { ctyId: req.body.ctyId },
            {
              bnrTitle: req.body.bnrTitle,
              bnrDesc: req.body.bnrDesc,
              bnrImgs: req.body.bnrImgs,
            }
          )
          .exec((err, succ) => {
            if (err) {
              res.send({
                responseCode: 400,
                responseMessage: "Please check all the fields.",
              });
            } else {
              ctyDetlDb
                .findOne({ ctyId: req.body.ctyId }, { _id: 1 })
                .exec(function (err, data) {
                  res.send({
                    responseCode: 200,
                    responseMessage: "Banner successfully added.",
                    data: { _id: data._id },
                  });
                });
            }
          });
      }
    });
  }
  // }
};

module.exports.getaddBannrDetl = function (req, res) {
  ctyDetlDb
    .find({}, { bnrTitle: 1, bnrDesc: 1, bnrImgs: 1 })
    .exec(function (err, data) {
      if (err) {
        res.send({
          responseCode: 400,
          responseMessage: "Banner doesn't exist.",
        });
      } else {
        res.send({
          responseCode: 200,
          responseMessage: "Banner lists are displayed successfully.",
          banners: data,
        });
      }
    });
};

module.exports.keyPoint = function (req, res) {
  if (req.body.keyImgs == "") {
    keyImgCndtn(req.body, res);
  } else if (req.body.keyImgs != "") {
    cloudinary.uploader.upload(req.body.keyImgs, function (result) {
      req.body.keyImgs = result.url;
      keyImgCndtn(req.body, res);
      // }
    });
    // }
  }

  function keyImgCndtn(body, res) {
    var ctyDetlReg = new ctyDetlDb(body);
    ctyDetlReg.save(function (err, succ) {
      if (err) {
        res.send({
          responseCode: 400,
          responseMessage: "Please check all the fields.",
        });
      } else {
        res.send({
          responseCode: 200,
          responseMessage: "Key points successfully added.",
        });
      }
    });
  }
};

module.exports.getKeyPoint = function (req, res) {
  ctyDetlDb
    .find({}, { keyTle: 1, keyDesc: 1, keyImgs: 1 })
    .exec(function (err, data) {
      if (err) {
        res.send({
          responseCode: 400,
          responseMessage: "Key points doesn't exist.",
        });
      } else {
        res.send({
          responseCode: 200,
          responseMessage: "Key point lists are displayed successfully.",
          keyPointList: data,
        });
      }
    });
};

module.exports.search_addCity = function (req, res) {
  addCityDb
    .find({ ctyName: { $regex: req.body.srchCty, $options: "$i" } })
    .exec(function (err, succ) {
      if (err) {
        res.send({
          responseCode: 400,
          responseMessage: "Please check all the fields.",
        });
      } else {
        res.send({
          responseCode: 200,
          responseMessage: "City successfully found.",
          data: succ,
        });
      }
    });
};
