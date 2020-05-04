var mongoose = require("mongoose"); 
var schema = mongoose.Schema;
var ctyDetls = new schema({
	
        bnrTitle: {
          type: String,
        },
        bnrDesc: {
          type: String,
        },
        bnrImgs: {
          type:String
        },
    
	ctyBnrImgs: {
		type: String,
		// required: true
	},
	bnrTitle: {
		type: String,
		// unique:true,
  	},
	ctyDesc: {
		type: String,
		// required: true
	},
	ctyName: {
		type: String,
		// required: true
	},
	actTitle: {
		type: String,
		// required: true
	},
	actImgs: {
		type: String,
		// required: true
	},
	actDesc: {
		type: String,
		// required: true
	},
	wlkName: {
		type: String,
		// required: true
	},
	wlkCty: {
		type: String,
		// required: true
	},
	wlkPostrImgs: {
		type: String,
		// required: true
	},
	wlkShrtDesc: {
		type: String,
		// required: true
	},
	wlkFullDesc: {
		type: String,
		// required: true
	},
	wlkMreImgs: {
		type: [String],
		// required: true
	},
	fodNme: {
		type: String,
		// required: true
	},
	fodCty: {
		type: String,
		// required: true
	},
	fodPostrImgs: {
		type: String,
		// required: true
	},
	fodShrtDesc: {
		type: String,
		// required: true
	},
	fodFullDesc: {
		type: String,
		// required: true
	},
	fodMreImgs: {
		type: [String],
		// required: true
	},
	ctyId: {
		type: String,
	},
       ctyVideo : {
                type: String,
       }
	// tour_Id: {
	// 	type: String,
	// 	// required: true
	// }
	// ctyName: {
	// 	type: String,
	// 	// required: true
	// }
	});

module.exports = mongoose.model("ctyDetlData",ctyDetls);


