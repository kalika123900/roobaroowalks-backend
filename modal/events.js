var mongoose = require("mongoose");
var schema = mongoose.Schema;
var event = new schema({
    addEvent: [{
        title: {
            type: String,
        },
        slug: {
            type: String,
            unique: true
        },
        viewCount: {
            type: Number,
            default:0
        },
        ShortDesc: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        eventBannerType:{
            type: String
        },
        eventBanner:{
            type: String
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        itinerary: [{
            itiTitle: {
                type: String
            },
            itiDescription: {
                type: String
            }
        }],
        gallery: [{
            images: {
                type: String
            }
        }],
        moreImages:[{
            images: {
                type: String
            },
            imgTitle: {
                type: String
            },
        }],
        highlights: [{
            images: {
                type: String
            },
            imgTitle: {
                type: String
            },
            imgDescription: {
                type: String
            },
        }],
        commentBlog:[{
            name: String, 
            emailId: String,    
            comment: String,
        }],
        pricewithaccomodation: {
            type: String
        },
        pricebase: {
            type: String
        },
        pricedescription:{
            type: String
        },
        cityId: {
            type: String
        },
        verticalImage: {
            type: String
        },
        citySlug: {
            type: String
        },
        metaTitle: {
            type: String
        },
        metaDescription: {
            type: String
        },
        targetKeywords: {
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
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    targetKeywords: {
        type: String
    }
});

Event = mongoose.model('events', event, 'events');
module.exports = Event;