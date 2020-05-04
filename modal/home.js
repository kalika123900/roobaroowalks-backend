var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var homes = new schema({
	homeBanner: [{
      	banrTitle: {
      		type: String,
      	},
      	banrDescrptn: {
      		type: String,
      	},
      	banrImgs: {
      		type:String
      	}
     }],
  activty: [{
      	actTitle: {
      		type: String,
      	},
      	actImgs: {
      		type: String,
      	},
      	actDesc: {
      		type:String
      	}
     }],
	review: [{
      	rvwName: {
      		type: String,
          default:"",
      	},
      	rvwTestm: {
      		type: String,
          default:"",
      	},
      	rvwPrfleImgs: {
      		type:String,
          default:"",
      	}
     }],
	memory: [{
      	memTitle: {
      		type: String,
      	},
      	memImgs: {
      		type: String,
      	},
      	memDesc: {
      		type:String
      	}
     }],
  mobleApp: [{
      	mobTitle: {
      		type: String,
      	},
      	mobImgs: {
      		type: String,
      	},
      	mobDesc: {
      		type:String
      	},
      	mobLink: {
      		type:String
      	},
        iOSLink:{
          type:String
        }
     }],
  travelr: [{
      	tvlrTitle: {
      		type: String,
      	},
      	tvlrImgs: {
      		type: String,
      	},
      	tvlrDesc: {
      		type:String
      	},
      	tvlrLink: {
      		type:String
      	}
     }],  
     // trpAdvisor: [{
     //  	tripLink: {
     //  		type:String
     //  	}
     // }],
  trpAdvisor: [{
       trpLogoLnk: {
          type: String,
        },
        trpReadLnk: {
          type: String,
        },
        trpWriteLnk: {
          type:String
        },
        trpImgs: {
          type:String
       }
     }],
  readWriteRvw: [{
      	readLnk: {
      		type:String
      	},
      	writeLnk: {
      		type:String
      	}
     }],
  social: [{
        fcebookLnk: {
          type:String
        },
        instaLnk: {
          type:String
        }
     }],
  // addCtyComngSoon: [{
  //       cityNme: {
  //         type: String,
  //       },
  //       cityCmgSn: {
  //         type: String,
  //       },
  //       cityImgs: {
  //         type:String
  //       }
  //    }]     
	});

	Home= mongoose.model("homeData",homes);
//module.exports = mongoose.model("homeData",homes);
module.exports=Home;
function init() {
	console.log("calling function of mobile App of home")
	Home.findOne({}, (error, success) => {
			if (error) {
					console.log(error)
			} else {
					if (success === null) {
							new Home({
								mobleApp:[{
									mobTitle: "sdfghujiuyjthgrdfghj.",
									mobDesc: "Lorem ipsum dolor sit amet.",
									mobImgs: "http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
									mobLink:"shsdvfvs.com",
									iOSLink:"sfsgfjjg.com"
								}],
								memory:[
									{
									memTitle:"nitesh",
									memImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                  memDesc:"aSDFGHJ"
								
								},{
									memTitle:"nitesh",
									memImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                  memDesc:"aSDFGHJ"
								
								},{
									memTitle:"nitesh",
									memImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                  memDesc:"aSDFGHJ"
								
								},

							],
								activty:[{
									actTitle:"nitesh",
									actImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
									actDesc:"dfghjkhgfdghj"
								
								},
								{
									actTitle:"nitesh",
									actImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
									actDesc:"dfghjkhgfdghj"
								
								},
								{
									actTitle:"nitesh",
									actImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
									actDesc:"dfghjkhgfdghj"
								
								}],
								travelr:[{
									tvlrTitle:"nitesh",
									tvlrImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
									tvlrDesc:"dfhgjhj",
									tvlrLink:"fgssa.com"
								}],
								trpAdvisor:[{
									trpLogoLnk:"fsaxgagxhs.com",
									trpReadLnk:"asfjca.com",
									trpWriteLnk:"asgdgsfah.com",
									trpImgs:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg"
								}],
								social:[{
									fcebookLnk:"facebook.com",
									instaLnk:"insta.com"
								}]
								
							}).save((error, success) => {
									//console.log("Successfully Added Mobile App Content", success)
							})
						
					}
			}
	})
}

init();
