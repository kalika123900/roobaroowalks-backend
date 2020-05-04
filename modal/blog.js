var mongoose = require("mongoose");
var schema = mongoose.Schema;
var blog = new schema({
    addBlog: [{
        title: {
            type: String,
            // required: true
        },
        cityId: {
            type: String,
        },
        viewCount: {
            type: Number,
            default:0
        },
        ShortDesc: {
            type: String
        },
        image: {
            type: String
        },
        moreImages: [{
            images: {
                type: String
            },
            imgTitle: {
                type: String
            },
            description: {
                type: String
            },

        }],
        commentBlog:[{
            name: String, 
            emailId: String,    
            comment: String,
        }],
        authorName: {
            type: String
        },
        authorTitle: {
            type: String
        },
        authorDescription: {
            type: String
        },
        authorprofilePic: {
            type: String
        },
        date: {
            type: String
        },
        category: {
            type: String
        },
        tags: {
            type: [String]
        },
        facebookLink: {
            type: String

        },
        twitterLink: {
            type: String

        },
        instagramLink: {
            type: String
        }


    }],
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    }




});

Blog = mongoose.model('blogData', blog, 'blogData');
module.exports = Blog;

function init() {
    console.log("calling function of Blog")
    Blog.findOne({}, (error, success) => {
        if (error) {
            console.log(error)
        } else {
            if (success === null) {
                new Blog({
                    title: "sdfghujiuyjthgrdfghj.",
                    description: "Lorem ipsum dolor sit.",
                    image: "http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg"
                }).save((error, success) => {
                    console.log("Successfully Added Blog banner Content", success)
                })

            }
        }
    })
}

init();





