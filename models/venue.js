var mongoose=require("mongoose");

//SCHEMA SETUP
var venueSchema= new mongoose.Schema({
	name: String,
	image: String,
	description:String,
	// owner: String,
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
})

var Venue= mongoose.model("Venue", venueSchema);

module.exports= Venue;