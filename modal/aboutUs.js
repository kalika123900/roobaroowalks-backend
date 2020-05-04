const mongoose = require('mongoose');

var aboutUs = mongoose.Schema({

    about: {
        type: String,
        default: null
    },
    desc: {
        type: String,
        default: null
    },
    bannerImage: {
        type: String,
        default: null
    },
    licenseInformation: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },



});

AboutUs = mongoose.model('aboutUs', aboutUs, 'aboutUs');
module.exports = AboutUs;

function init() {
    console.log("calling function of aboutUs")
    AboutUs.findOne({}, (error, success) => {
        if (error) {
            console.log(error)
        } else {
            if (success === null) {
                new AboutUs({

                    about: "Lorem ipsum .",
                    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ornare, nisl ut pulvinar varius, ex purus luctus metus, vitae fermentum lacus leo at quam.",
                    bannerImage:"http://res.cloudinary.com/dxxstikij/image/upload/v1542885579/lapxdhfi0sso7cm3gxbt.jpg",
                    licenseInformation:"sdxfcgvhbjkjhgfds"

                }).save((error, success) => {
                    console.log("Successfully Added AboutUs Content", success)
                })

            }
        }
    })
}

init();