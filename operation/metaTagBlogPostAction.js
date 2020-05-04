var metaTagBlogActionDb  = require("../modal/metaTagBlogPost");

// store meta tags
module.exports.storeBlogPostMetaTags=function(req,res){
    var metatagregist = new metaTagBlogActionDb(req.body)
    metatagregist.save(function(err,succ){
      if(err){
        res.send({"responseCode":400,"responseMessage":"Please check all the fields."})
      } else{
        res.send({"responseCode":200,"responseMessage":"Data Store Successfully"})
      }
    })
}


// fetch the meta tags
module.exports.get_AddBlogPostMetaTags =function(req,res){
    // {
    //     $lookup:
    //       {
    //         from: 'metatagdatas',
    //         localField: 'city',
    //         foreignField: '_id',
    //         as: 'cityname'
    //       }
    //  }

  //   ([
  //     {$match: {_id: 'john'}},
  //     {$unwind:"$items"},
  //     {$unwind:"$items.items"},
  //     {$lookup: {
  //         from: 'schools', 
  //         localField: 'items.items.school', 
  //         foreignField: '_id', 
  //         as: 'schoolInfo'}},
  //     {$unwind:"$schoolInfo"},
  //     {$project:{
  //         "_id":1,
  //         "items":[{
  //             "name":"$items.name",
  //             "items":[{
  //             "school":"$schoolInfo._id"    ,
  //             "grad":"$items.items.grad"    ,
  //             "schoolInfo":"$schoolInfo"
  //             }]
  //         }]            
  //     }}
  // ])



    metaTagBlogActionDb.find(
    //   [
    //   // {$unwind:"$addBlog"},
    //   { $match: { blog:'5c94a1bcfaca6121dbb46680' } },
    //    { $lookup :
    //         {
    //             from: 'blogData',
    //             localField: 'blog',
    //             foreignField: 'addBlog."5c94a1bcfaca6121dbb46680"',
    //             as: 'blogName'
    //         }
    //     }
    
    // ]
    // {$match: {uuid: 'de36dd72-238b-47b0-b363-3fbfa1f2743e'}},
    // {$unwind:"$posts"},
    // {$lookup: {
    //     from: 'users', 
    //     localField: 'posts.user_uuid', 
    //     foreignField: 'uuid', 
    //     as: 'userInfo'}}
    ).exec(function(err,data){
          if(err){
              res.send({"responseCode":400,"responseMessage":"Meta Tags doesn't exist."})
          } else{
              res.send({"responseCode":200,"responseMessage":"Meta Tags are displayed successfully.","data": data})
  
          }
   })
}

// delete
module.exports.delete_addBlogPostMetaTags=function(req,res){
    metaTagBlogActionDb.deleteOne({_id:req.body.metaTagId}).exec((err,data)=>{
          if(err){
              res.send({"responseCode":400,"responseMessage":"Error."})
          } else{
              res.send({"responseCode":200,"responseMessage":"MetaTag successfully deleted."})
          }
      })
}

//edit 
module.exports.edit_AddBlogPostMetaTags=function(req,res){
    console.log(req.body);
    metaTagBlogActionDb.updateOne({_id: req.body.metaTagId},{blog:req.body.blog,title:req.body.title,metaTags:req.body.metaTags}).exec((err,data)=>{
      if(err){
        res.send({"responseCode":400,"responseMessage":"Some error please try after some time"})
      } else{
        res.send({"responseCode":200,"responseMessage":"Details successfully updated."})
      }
    })
}

// fetch for frontend
module.exports.get_blog_post_meta_tags=function(req,res){
  console.log('req.body------------->',req.body);
  metaTagBlogActionDb.find({blog:req.params.blog}).exec(function(err,data){
      if(err){
          res.send({"responseCode":400,"responseMessage":"Meta tags doesn't exist."})
      } else{
          res.send({"responseCode":200,"responseMessage":"Meta tags are displayed successfully.","data": data})

      }
  })
}
