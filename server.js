var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sgn = require("./operation/signAction");
var addcty = require("./operation/addCityAction");
var hme = require("./operation/homeAction");
var ctyDet = require("./operation/ctyDetlActn");
//var booking=require("./operation/adminAction");
 var admin = require("./operation/adminAction");
 var career =require("./operation/careerAction");
 var contact = require("./operation/contactAction");
 var about =require("./operation/aboutAction");
 var story=require("./operation/storyAction");
 var team=require("./operation/teamAction");
 var blogBanner=require("./operation/blogAction");
 var event=require("./operation/eventAction");
 var guide=require("./operation/guidesAction");
 var traveller=require("./operation/travellerAction");
 var feedbck=require("./operation/feedbackAction");
 var tags=require("./operation/tagAction");
 var instaa=require("./operation/instaAction");
 var category=require("./operation/categoryAction");
 var guest =require("./operation/guestBookAction");
 var bokng =require("./operation/bookingAction");
 var strMetatags = require("./operation/metaTagAction");
 var strMetaTagCity = require("./operation/metaTagCityAction");
 var strMetaTagWalk = require("./operation/metaTagWalkAction");
 var strMetaBlogPost = require("./operation/metaTagBlogPostAction");
 var contactMail = require("./operation/contactUsMail");
 var culture = require("./operation/cultureAction");
 var history = require("./operation/historyAction");

 var walk =require("./modal/walk");
//var contactDb=require('./modal/contacts');
var sgndb = require("./modal/sign");
var addctydb = require("./modal/addCity");
var hmedb = require("./modal/home");
var hmedb = require("./modal/home");
var ctyDetdb = require("./modal/ctyDetl");
var cultureDb = require("./modal/ctyDetl");
// var admindb = require("./modal/admin");



var app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));


app.use(express.static(path.join(__dirname, '/dist/roobrooDemo')));
// ---------------


// app.use(express.static(path.join(__dirname, '/build')));

// app.get('/', (req, res) => {
// res.sendFile(__dirname + '/build/index.html')
// });

//--------------- for local -------------------------
// var mongoDB = 'mongodb://localhost:27017/roobaroos_local';

// --------------- for live ------------------------
var mongoDB = 'mongodb://localhost/roobaroos';
mongoose.connect(mongoDB,{ useNewUrlParser: true , useCreateIndex: true},
    function(err, conn) {
        if (err) {
            console.log("error occured")
        } else {
            console.log("connected")
        }
    });

// var mongoDB = 'mongodb://localhost/teamdatas';
// mongoose.connect(mongoDB,
//     function(err, conn) {
//         if (err) {
//             console.log("error occured")
//         } else {
//             console.log("connected")
//         }
//     });


app.post("/sign_up",sgn.userSignUp)
app.post("/user_login",sgn.userLogin)
app.post("/recovr_pswd",sgn.recovrPswd)
app.post("/reset_pswd",sgn.userResetPswd)
app.post("/getProfile",sgn.getProfile)
app.post("/editProfile",sgn.editProfile)
app.post("/verifyOtp",sgn.verifyOtp);


app.post("/add_city",addcty.addCitys)
app.post("/edit_city",addcty.editCitys)
app.post("/delete_city",addcty.deleteCitys)
app.get("/get_city",addcty.getCity)
app.post("/get_detailById",addcty.getdetailById)
app.post("/get_detailBySlug",addcty.getdetailBySlug)
app.post("/search_addCity",addcty.search_addCity)


app.post("/add_banr",hme.addBannr)
app.get("/get_bannr",hme.getBanner)
app.post("/delete_bannr",hme.deleteBanner)
app.post("/edit_bannr",hme.editBanner)
//app.post("/home_actvty",hme.homeActivty)
app.get("/get_homeActivty",hme.getHomeActivty)
app.post("/edit_hmeAct",hme.editHomeActivty)
app.post("/add_review",hme.addReview)
app.get("/get_addReview",hme.get_addRevw)
app.post("/edit_addReview",hme.editAddReview)
app.post("/dlt_addReview",hme.deleteAddReview)
//app.post("/memories",hme.memries)
app.get("/get_memries",hme.get_memries)
app.post("/edit_memries",hme.editMemries)
//app.post("/mobile_app",hme.mobileApp)
app.get("/get_mobApp",hme.getMobApp)
app.post("/edit_mobApp",hme.editMobApp)
//app.post("/travelr",hme.traveller)
app.post("/edit_travelr",hme.editTravelr)
app.get("/get_travelr",hme.getTravelr)
//app.post("/trip_advsr",hme.tripAdvsr)
app.get("/get_tripAdvsr",hme.getTripAdvsr)
app.post("/edit_trpAdvsr",hme.editTripAdvsr)
app.post("/read_write",hme.readWrite_rvw)
app.get("/get_readWrite",hme.getReadWriteRvw)
//app.post("/social_post",hme.socialPost)
app.get("/get_social",hme.getSocial)
app.post("/edit_social",hme.editSocial)
app.post("/addCty_ComngSoon",hme.addCtyComngSoon)
app.get("/get_addCtyComngSoon",hme.getAddCtyComngSoon)

// app.get("/get_travelr",hme.getTravelr)
// app.post("/blog",hme.blogs)
// app.get("/get_blog",hme.getBlog)
// app.post("/add_mreMemImgs",hme.addMoreMemImgs)

app.post("/add_CtyBannr",ctyDet.addCtyBannr)
app.get("/get_ctyBanner",ctyDet.getCtyBanner)
// app.post("/addBnrDetl",ctyDet.addBannrDetl)
// app.get("/getaddBnrDetl",ctyDet.getaddBannrDetl)
app.post("/edit_addBnrDetl",ctyDet.editAddBnrDetl)
app.post("/dlt_addBnrDetl",ctyDet.deleteAddBnrDetl)
// app.post("/key_point",ctyDet.keyPoint)
// app.get("/get_keyPoint",ctyDet.getKeyPoint)

app.post("/cty_detlAct",ctyDet.ctyDetlActvty)
app.get("/get_ctyDetlAct",ctyDet.getCtyDetlActvty)
app.post("/walkng_tour",ctyDet.walkngTour)
app.post("/WT_addMreImgs",ctyDet.WTaddMreImgs)
app.get("/get_wlkngTrShrt",ctyDet.getWlkngTourShrt)
app.get("/get_wlkngTrFul",ctyDet.getWlkngTourFul)


app.post("/food_exp",ctyDet.foodExp)
app.post("/FE_addMreImgs",ctyDet.FEaddMreImgs)
app.get("/get_foodExpShrt",ctyDet.getFoodExpShrt)
app.get("/get_foodExpFul",ctyDet.getFoodExpFul)




/////////////////////////////////////////////////////////
app.post("/addWalks",admin.addWalks);
app.post("/editWalks",admin.editWalks);
app.post('/get_Walks',admin.getWalks);
app.post('/getWalkByCategory',admin.getWalkByCategory);
app.get("/getwalkDetails/:id",admin.getwalkDetails);
app.post('/getWalkByCity',admin.getWalkByCity);
app.post("/search_walk",admin.search_walk);
app.post("/addWalk_feedback",admin.addWalk_feedback);
app.post("/get_walkFeedback",admin.get_walkFeedback);
app.post('/deleteWalks',admin.deleteWalks);
app.post("/addmoreimagesofWalk",admin.addmoreimagesofWalk);
app.post("/addMore_clientImgs",admin.addMore_clientImgs);
app.get("/get_clientImg",admin.get_clientImg);
app.post("/editMore_clientImgs",admin.editMore_clientImgs)
// app.get("/get_walkFeedback_admin",admin.get_walkFeedback_admin);
app.post("/addToCart",admin.addToCart);
app.post("/addbookingDetails",admin.addbookingDetails);
app.get("/getbookingDetails/:id",admin.getbookingDetails);
app.post("/getcartItem",admin.getcartItem);
app.post("/clearUserCart",admin.clearUserCart);
app.post("/delete_cartItems",admin.delete_cartItems);

//  new routes for admin login start
app.post("/admin_Login",admin.adminLogin);
//app.post("/admin_ChangePswd",admin.adminChangePswd);
app.post("/admin_forgotPassword",admin.forgotPassword);
app.post("/admin_verifyOtp",admin.verifyOtp);
app.post("/admin_updateAdminPass",admin.updateAdminPass);
app.get("/admin_getProfile",admin.getProfile);
app.post("/admin_editProfile",admin.editProfile);
app.post("/admin_register",admin.register);
//  new routes for admin login end

///////////////////////////////////
 app.post("/addContact",contact.addContact);
 app.get("/getcontactDetail",contact.getcontactDetail);
 app.post("/get_InTouch",contact.getInTouch);
 app.post("/editContact",contact.editContact);
 app.post("/AddOurOffice",contact.AddOurOffice);
 app.get("/getOurOffice",contact.getOurOffice);
 app.post("/edit_ourOffice",contact.edit_ourOffice);
 app.post("/delete_ourOffice",contact.delete_ourOffice);

app.post("/join_us",career.joinus);
app.get("/getCareer",career.getCareer);
app.post("/updateCareer",career.updateCareer);
app.post("/addCards",career.addCards);
app.post("/editCards",career.editCards);
app.post("/deleteCarrierCard",career.deleteCards);
app.get("/getAbout",about.getAbout);
app.post("/updateAbout",about.updateAbout);
app.post("/addStory",story.addStory);
app.post("/editStory",story.editStory);
app.post("/deleteStory",story.deleteStory);
app.get("/getStory",story.getStory);
/////////////////////////////////////////
app.post("/addTeam",team.addTeam);
app.post("/editTeam",team.editTeam);
app.post("/deleteTeam",team.deleteTeam);
app.get("/getTeam",team.getTeam);

app.get("/getbannerBlog",blogBanner.getbannerBlog);
app.post("/updatebannerBlog",blogBanner.updatebannerBlog);
app.post("/addBlog",blogBanner.addBlog);
app.post("/updateBlog",blogBanner.updateBlog);
app.get("/getBlog",blogBanner.getBlog);
app.post("/addmoreImages",blogBanner.addmoreImages);
app.post("/deleteBlog",blogBanner.deleteBlog);
app.post("/getblogDetail",blogBanner.getblogDetail);
app.post("/editmoreImages",blogBanner.editmoreImages);
app.post("/search_blog",blogBanner.search_blog);
app.post("/city_blog",blogBanner.city_blog);
app.post("/add_commentOnBlog",blogBanner.add_commentOnBlog);
app.get("/popularPost",blogBanner.popularPost);
app.post("/blogbytag",blogBanner.blogbytag);
app.post("/blogbyCategory",blogBanner.blogbyCategory);

app.get("/getbannerEvent",event.getbannerEvent);
app.post("/getEventDetails",event.getEventDetails);
app.post("/updatebannerEvent",event.updatebannerEvent);
app.post("/addEvent",event.addEvent);
app.post("/updateEvent",event.updateEvent);
app.post("/addEventHighlights",event.addHightlights);
app.post("/editEventHighlights",event.editHightlights);
app.post("/addEventMoreImages",event.addMoreImages);
app.post("/editEventMoreImages",event.editMoreImages);
app.post("/deleteEvent",event.deleteEvent);

app.get("/getbannerhistory",history.getHistory);
app.post("/updatebannerhistory",history.updateHistory);
app.post("/addhistorycard",history.addCards);
app.post("/edithistorycard",history.editCards);
app.post("/deletehistorycard",history.deleteCards);

app.get("/getbannerCulture",culture.getbannerCulture);
app.post("/updatebannerCulture",culture.updatebannerCulture);
app.post("/addCultureCity",culture.addCultureCity);
app.post("/editCultureCity",culture.editCultureCity);
app.post("/addCultureMoreImages",culture.addCultureMoreImages);
app.post("/editCultureMoreImages",culture.editCultureMoreImages);
app.post("/addCultureHighlights",culture.addCultureHighlight);
app.post("/editCultureHighlights",culture.editCultureHighlight);
app.post("/deleteCultureCity",culture.deleteCultureCity);

app.post("/addGuide",guide.addGuide);
app.get("/get_addGuide",guide.get_allGuide);
app.post("/get_addGuide",guide.get_addGuide);
app.post("/edit_addGuide",guide.edit_addGuide);
app.post("/delete_addGuide",guide.delete_addGuide);
app.post("/search_addGuide",guide.search_addGuide);

app.get("/getaddBanner",traveller.getaddBanner);
app.post("/editaddBanner",traveller.editaddBanner);
app.post("/addWalk_trav",traveller.addWalk);
app.get("/getWalk_trav",traveller.getWalk);
app.post("/getWalkByCity_trav",traveller.getWalkByCity);
app.post("/editWalk_trav",traveller.editWalk_trav);
app.post("/deleteWalk_trav",traveller.deleteWalk_trav);
app.post("/getwalkDetail_trav",traveller.getwalkDetail_trav);
app.post("/addArticle",traveller.addArticle);
app.get("/getArticle",traveller.getArticle);
app.post("/editArticle",traveller.editArticle);
app.post("/deleteArticle",traveller.deleteArticle);
app.post("/getarticleDetail",traveller.getarticleDetail);
app.post("/addReview",traveller.addReview);
app.get("/getReview",traveller.getReview);
app.post("/editReview",traveller.editReview);
app.post("/deleteReview",traveller.deleteReview);
app.post("/getreviewDetail",traveller.getreviewDetail);

app.post("/add_City_feedback",feedbck.add_City_feedback);
app.post("/get_cityFeedback",feedbck.get_cityFeedback);
app.post("/edit_cityFeedback",feedbck.edit_cityFeedback);
app.post("/delete_cityFeedback",feedbck.delete_cityFeedback);
app.post("/search_cityFeedback",feedbck.search_cityFeedback);
app.post("/edit_walkFeedback",admin.edit_walkFeedback);


app.post("/addWalk_feedback",admin.addWalk_feedback);
app.post("/get_walkFeedback",admin.get_walkFeedback);
// app.post("/edit_walkFeedback",admin.edit_walkFeedback);
app.post("/delete_walkFeedback",admin.delete_walkFeedback);
app.post("/search_walkFeedback",admin.search_walkFeedback);

app.post("/add_tag",tags.add_tag);
app.get("/get_tag",tags.get_tag);
app.post("/delete_tag",tags.delete_tag);

app.post("/add_instaImgs",instaa.add_instaImgs);
app.get("/get_instaImgs",instaa.get_instaImgs)
app.post("/edit_instaImgs",instaa.edit_instaImgs);
app.post("/delete_instaImgs",instaa.delete_instaImgs);

app.post("/addCategory",category.addCategory);
app.get("/getCategory",category.getCategory);
app.post("/deleteCategory",category.deleteCategory);

app.post("/guestBooking",guest.guestBooking);

app.post("/bookingRegist",bokng.bookingRegist);
app.post("/getBookingById",bokng.getBookingById);
app.get("/getBooking",bokng.getBooking);
app.post("/search_booking",bokng.search_booking);
app.post("/deleteOrder",bokng.deleteOrder);
app.post("/ordered_details",bokng.ordered_details);
app.post("/deleteBooking",bokng.deleteBooking);
app.post("/updateBooking",bokng.editBooking);
app.post("/wlkNmbkngSrc",bokng.wlkNmSrch);
app.post("/datebkngSrc",bokng.dateSrch);
app.post("/assignGuide",bokng.asinGuideWlkNm);

// static pages meta tags
app.post("/storeMetaTags",strMetatags.storeMetaTag);
app.get("/get_AddMetaTags",strMetatags.get_AddMetaTags);
app.post("/delete_addMetaTags",strMetatags.delete_addMetaTags);
app.post("/edit_AddMetaTags",strMetatags.edit_AddMetaTags);
app.get("/get_meta_tag/:page",strMetatags.get_meta_tag);

//cities meta tags routes
app.post("/storeCityMetaTags",strMetaTagCity.storeCityMetaTags);
app.get("/get_AddCityMetaTags",strMetaTagCity.getAddMetaTags);
app.post("/delete_addCityMetaTags",strMetaTagCity.delete_addCityMetaTags);
app.post("/edit_AddCityMetaTags",strMetaTagCity.edit_AddCityMetaTags);
app.get("/get_city_meta_tag/:page",strMetaTagCity.get_meta_tag);

//walks meta tags routes
app.post("/storeWalkMetaTags",strMetaTagWalk.storeWalkMetaTags);
app.get("/get_AddWalkMetaTags",strMetaTagWalk.getAddMetaTags);
app.post("/delete_addWalkMetaTags",strMetaTagWalk.delete_addWalkMetaTags);
app.post("/edit_AddWalkMetaTags",strMetaTagWalk.edit_AddWalkMetaTags);
app.get("/get_walk_meta_tags/:walk",strMetaTagWalk.get_walk_meta_tags);

// meta tags for blog post routes
app.post("/storeBlogPostMetaTags",strMetaBlogPost.storeBlogPostMetaTags);
app.get("/get_AddBlogPostMetaTags",strMetaBlogPost.get_AddBlogPostMetaTags);
app.post("/delete_addBlogPostMetaTags",strMetaBlogPost.delete_addBlogPostMetaTags);
app.post("/edit_AddBlogPostMetaTags",strMetaBlogPost.edit_AddBlogPostMetaTags);
app.get("/get_blog_post_meta_tags/:blog",strMetaBlogPost.get_blog_post_meta_tags);

// contact mail
app.post("/contactUsMail", contactMail.contactRequest);

app.get('/*', (req, res) => {
res.sendFile(__dirname + '/dist/roobrooDemo/index.html')
});
app.listen(5000, function() {
    console.log('Roobaroo Server up: http://localhost:', 5000);
});
