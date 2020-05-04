var mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');


var schema = mongoose.Schema;
var traveller = new schema({

    addBanner: [{
        title: {
            type: String
        },
        description: {
            type: String
        },
        bannerImage: {
            type: String
        }

    }],
    addWalk: [{
        cityId: {
            type: String
        },
        cityName: {
            type: String
        },
        walkTitle: {
            type: String
        },
        description: {
            type: String
        },
        walkId: {
            type: String
        },
        image: {
            type: String
        }


    }],
    article: [{
        firstArticle: {
            type: String
        },
        title: {
            type: String
        },
        secondArticle: {
            type: String
        }


    }],
    addReview:[{

        title:{
            type:String
        },
        link:{
            type:String
        },
        image:{
            type:String
        }
    }]
    
    



});
Traveller = mongoose.model('traveller', traveller, 'traveller');
module.exports = Traveller;


function init() {
    console.log("calling function of traveller")
    Traveller.findOne({}, (error, success) => {
        if (error) {
            console.log(error)
        } else {
            if (success === null) {
                new Traveller({
                    addBanner:[{
                    title: "sdfghujiuyjthgrdfghj.",
                    description: "Lorem ipsum dolor sit amet.",
                    bannerImage: "http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg"
                    }],
                    article:[{
                    firstArticle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare, nisl ut pulvinar varius, ex purus luctus metus, vitae fermentum lacus leo at quam. Donec finibus felis ut lorem iaculis consequat. Sed non dui ut lorem accumsan malesuada. Mauris efficitur ultrices elit, eget maximus elit accumsan quis. Sed ut dignissim lectus. Etiam vehicula orci at consectetur faucibus. Nullam tempus tincidunt fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras fringilla scelerisque justo, nec luctus diam vestibulum eu. Donec metus sem, tristique vel massa quis, luctus lobortis neque. Nullam augue lectus, maximus vel sollicitudin a, convallis eleifend risus. Praesent rhoncus feugiat felis in viverra. Maecenas nec felis ultricies, dignissim lorem in, auctor nisl. Morbi mi elit, tempor non accumsan a, faucibus eu purus. In fermentum congue sagittis. Vivamus non nibh sit amet risus aliquet lobortis.",
                    title: "hhh ggg",
                    secondArticle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare, nisl ut pulvinar varius, ex purus luctus metus, vitae fermentum lacus leo at quam. Donec finibus felis ut lorem iaculis consequat. Sed non dui ut lorem accumsan malesuada. Mauris efficitur ultrices elit, eget maximus elit accumsan quis. Sed ut dignissim lectus. Etiam vehicula orci at consectetur faucibus. Nullam tempus tincidunt fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras fringilla scelerisque justo, nec luctus diam vestibulum eu. Donec metus sem, tristique vel massa quis, luctus lobortis neque. Nullam augue lectus, maximus vel sollicitudin a, convallis eleifend risus. Praesent rhoncus feugiat felis in viverra. Maecenas nec felis ultricies, dignissim lorem in, auctor nisl. Morbi mi elit, tempor non accumsan a, faucibus eu purus. In fermentum congue sagittis. Vivamus non nibh sit amet risus aliquet lobortis.",
                    }]
                }).save((error, success) => {
                    //console.log("Successfully Added traveller banner Content", success)
                })

            }
        }
    })
}

init();
