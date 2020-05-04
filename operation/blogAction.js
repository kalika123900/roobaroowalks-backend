var Blogs = require("../modal/blog");
var mongoose = require("mongoose")
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxxstikij',
    api_key: '321311861714116',
    api_secret: 'Efjm85BxLaWKVwQ4yq-nfvwnlf8'
});




module.exports.getbannerBlog = (req, res) => {

    Blogs.find({}, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
            res.send({ "responseCode": 200, "responseMessage": "Banner Blog Details Found ", result })
    })
}







module.exports.updatebannerBlog = (req, res) => {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseMessage": "Banner Image is missing" })
    }

    var data = req.body.image

    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
        Blogs.update({ _id: req.body._id }, req.body, (err, succ) => {
            if (err) {
                res.send({ "responseCode": 400, "responseMessage": "Something went wrong", err })
            }
            else if (!succ)
                res.send({ "responseCode": 201, "responseMessage": "No data found" })
            else
            res.send({ "responseCode": 200, "responseMessage": "Blog Banner data updated successfully", succ })
        })
    }
    )
}



module.exports.addBlog = function (req, res) {
    if (!req.body.image) {
        res.send({ "responseCode": 400, "responseMessage": "Image is missing" });
    }
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
         cloudinary.uploader.upload(req.body.authorprofilePic, function (resultPic) {
            req.body.authorprofilePic = resultPic.url
        Blogs.find().exec(function (error, data) {
            let tempData = data[0].addBlog;
            tempData.push(req.body)
            Blogs.update({ _id: data[0]._id }, { addBlog: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Blog Not added Successfully" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Blog added Successfully", succ })
                }
            })
        })
       })
    })
}

module.exports.updateBlog = (req, res) => {
    if(!req.body.image){
        res.send({"responseCode":400,"responseMessage":"Banner Image is missing"})
    }
    var data = req.body.image
    cloudinary.uploader.upload(data, function (result) {
        req.body.image = result.url
     cloudinary.uploader.upload(req.body.authorprofilePic, function (resultPic) {
        req.body.authorprofilePic = resultPic.url
        Blogs.find().exec(function (error, data) {
            let tempData = data[0].addBlog;
            let index = tempData.findIndex(function(item,index){
                return(item._id==req.body._id);
            })
            tempData.splice(index,1,req.body);
            Blogs.update({ _id: data[0]._id },{addBlog: tempData}).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Blog Not added Successfully" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Blog added Successfully", succ })
                }
            })
        })
      })
    })
}

module.exports.getBlog = (req, res) => {

    Blogs.findOne({}, { addBlog: 1 }, (err, result) => {
        if (err)
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong" })
        else if (!result)
            res.send({ "responseCode": 404, "responseMessage": "No data found" })
        else if (result)
        var _blogs = result.addBlog;
        _blogs.sort(function(a,b){
            let aDateArray = a.date.split('/');
            let bDateArray = b.date.split('/');
            aCorrectDate = aDateArray[1]+'/'+aDateArray[0]+'/'+aDateArray[2]; 
            bCorrectDate = bDateArray[1]+'/'+bDateArray[0]+'/'+bDateArray[2]; 
            return new Date(bCorrectDate) - new Date(aCorrectDate);
          });
        result.addBlog = _blogs;
        res.send({ "responseCode": 200, "responseMessage": "Banner Blog Details Found ", result })
    })
}

module.exports.addmoreImages = function (req, res) {

    if (!req.body.images) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Blogs.find().exec(function (error, data) {
            let tempData = data[0].addBlog;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            objData.moreImages.push({images:req.body.images,imgTitle:req.body.imgTitle,description:req.body.description})
            tempData.splice(ind,1,objData);
            Blogs.update({ _id: data[0]._id }, { addBlog: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "Image not added" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Images added Successfully", succ })
                }

            })
        })
    })
}




module.exports.deleteBlog = function (req, res) {

    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the blog Id" })
    }
    
        Blogs.find().exec(function (error, data) {
            
            Blogs.update({ _id: data[0]._id },{ $pull:{addBlog:{_id:req.body.id}} }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ responseCode: 201, responseMessage: "No blog found" })
                else {
                    res.send({ responseCode: 200, responseMessage: "Blog Deleted Successfully" })
                }

            })
        })
    
}

module.exports.getblogDetail = function (req, res) {

    if (!req.body.id) {
        res.send({ "responseCode": 400, "responseCode": "Please provide the blog Id" })
    }
    
        Blogs.find().exec(function (error, data) {
            let tempData = data[0].addBlog;
            let detail = tempData.find(function(item,index){
                if(item._id==req.body.id)
                return(item);
            })

            
                if (error) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!data)
                    res.send({ responseCode: 201, responseMessage: "No blog found" })
                else {
                    Blogs.updateOne({_id: data[0]._id, addBlog: { $elemMatch: { _id: req.body.id} }},{ $set: { "addBlog.$.viewCount" : detail.viewCount+1 } }).exec(function(err,succ){
                    if(err){
                       res.send({ "responseCode": 400, "responseMessage": "Something went wrong." })
                    } else{
                      res.send({ responseCode: 200, responseMessage: "Blog found Successfully",detail })
                    }
                })
                }

            })
        
    
}



module.exports.editmoreImages = function (req, res) {

    if (!req.body.moreImages) {
        res.send({ "responseCode": 400, "responseCode": "Image is missing" })
    }
    var data = req.body.images
    cloudinary.uploader.upload(data, function (result) {
        req.body.images = result.url
        Blogs.find().exec(function (error, data) {
            let tempData = data[0].addBlog;
            let ind=-1;
            let objData =tempData.find(function(item,index){
                if(item._id==req.body.id){
                   ind=index;
                   return item;
                } 
            })
            
           objData.moreImages=req.body.moreImages;
           tempData.splice(ind,1,objData);

            Blogs.update({ _id: data[0]._id }, { addBlog: tempData }).exec(function (err, succ) {
                if (err) {
                    res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
                }
                else if (!succ)
                    res.send({ "responseCode": 201, "responseMessage": "Image not updated" })
                else {
                    res.send({ "responseCode": 200,"responseMessage":"Images updated Successfully", succ })
                }

            })
        })
    })
}



module.exports.search_blog =function(req,res){
   Blogs.find().exec(function(err,succ){
    let tempData=succ[0].addBlog;
        let objData = [];
        tempData.find(function(item,index){
            if((item.title).toLocaleLowerCase().includes(req.body.srchBlog.toLocaleLowerCase())){
               objData.push(item);
            }
        })
       if(err){
          res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
       } else {
           res.send({"responseCode":200,"responseMessage":"Post successfully found.",data: objData})
       }
   })
}
module.exports.city_blog =function(req,res){
    var cityId = req.body.cityId;
    var objData = [];
    Blogs.find().exec(function(err,succ){
        if(cityId=="")
        {   
            objData=succ[0].addBlog;
        }
        else
        {
            let tempData=succ[0].addBlog;
            
         
            tempData.find(function(item,index){
                if(item.cityId==cityId){
                    objData.push(item);
                }
            });
        } 
         objData.sort(function(a,b){
            let aDateArray = a.date.split('/');
            let bDateArray = b.date.split('/');
            aCorrectDate = aDateArray[1]+'/'+aDateArray[0]+'/'+aDateArray[2]; 
            bCorrectDate = bDateArray[1]+'/'+bDateArray[0]+'/'+bDateArray[2]; 
            return new Date(bCorrectDate) - new Date(aCorrectDate);
          });
        
        if(err){
           res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
        } else {
            res.send({"responseCode":200,"responseMessage":"Post successfully found.",data: objData})
        }
    })
 }
module.exports.add_commentOnBlog=function(req,res){
    Blogs.find().exec(function(error,data){
        let tempData=data[0].addBlog;

        let ind=-1;
        let objData=tempData.find(function(item,index){
            if(item._id==req.body.blogId){
                ind=index;
                return item;
            }
        })
        objData.commentBlog.push(req.body.comment);
        tempData.splice(ind,1,objData)
        Blogs.updateOne({_id:data[0]._id},{addBlog:tempData}).exec(function(err,succ){
            if (err) {
                res.send({ "responseCode": 400, "responseMessage": "Internal server error" })
            }
            else if (!succ)
                res.send({ responseCode: 201, responseMessage: "Comment not added" })
            else {
                res.send({ responseCode: 200, responseMessage: "Comments added Successfully", succ })
            }

        })
   
    })
}


module.exports.popularPost =function(req,res){
    Blogs.find().exec(function(error,data){
        let tempData=data[0].addBlog;
     Blogs.aggregate([{$match: { "_id":data[0]._id}},{ $unwind: '$addBlog' },{$sort: {'addBlog.viewCount': -1}}]).limit(3).exec((err, result)=> {
                if(err){
                    res.send({ "responseCode": 400, "responseMessage": "Something went wrong." })
                 }
                 else if(!result)
                 res.send({ "responseCode": 401, "responseMessage": "No data found." })
                  else{
                   res.send({ responseCode: 200, responseMessage: "Blog found Successfully",result })
                 }
             })
             

         })        
}

module.exports.blogbytag =function(req,res){
     Blogs.find().exec(function(error,data){
        if(error){
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong." })
        } else{
        let tempData=data[0].addBlog;
        let objData = [];
        tempData.find(function(item,index){
            if((item.tags).includes(req.body.tag)){
               objData.push(item);
            }
        })
        res.send({ responseCode: 200, responseMessage: "Blog found Successfully",objData })
        }
     })        
    }

    module.exports.blogbyCategory =function(req,res){
     Blogs.find().exec(function(error,data){
        if(error){
            res.send({ "responseCode": 400, "responseMessage": "Something went wrong." })
        } else{
        let tempData=data[0].addBlog;
        let objData = [];
        tempData.find(function(item,index){
            if(item.category==req.body.category){
               objData.push(item);
            }
        })
        res.send({ responseCode: 200, responseMessage: "Blog found Successfully",objData })
        }
     })        
    }