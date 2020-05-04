var mongoose = require("mongoose");
var schema = mongoose.Schema;
var culture = new schema({
    addCity: [{
        moreImages:[{
            images: {
                type: String
            },
            imgTitle: {
                type: String
            },
        }],
        cityId: {
            type: String
        },
        title:{
            type: String
        },
        description: {
            type: String
        }
    }],
    highlights:[{
        images: {
            type: String
        },
        imgTitle: {
            type: String
        },
        imgLink: {
            type: String
        }
    }],
    title: {
        type: String
    },
    description: {
        type: String
    },
    fullDescription: {
        type: String
    },
    bottomTitle: {
        type: String
    },
    bottomDescription: {
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

Culture = mongoose.model('culture', culture, 'culture');
module.exports = Culture;