var Venue= require("../models/venue");
var Comment= require("../models/comment")

//all the middleware
var middlewareObj= {};

middlewareObj.isLoggedIn= function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	//req.flash("error", "Please Login First");
	res.redirect("/login");
}



middlewareObj.checkVenueOwnership=function(req, res, next){
	if(req.isAuthenticated()){
		Venue.findById(req.params.id, function(err, foundVenue){
		if(err || !foundVenue){
			// req.flash("error", "Venue not found")
			res.redirect("/venues")
		}else{
			//if so does the user own the campground?
			if(foundVenue.author.id.equals(req.user._id) ){
			next()	
			}else{
				// req.flash("error", "You don't have permission to do that");
				res.redirect("/venues/"+req.params.id)
			}
		}
		})
	}else{
		// req.flash("error", "You need to be logged in to do that")
		res.redirect("/venues/"+req.params.id);
	}
}

middlewareObj.checkCommentOwnership=function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err || !foundComment){
			// req.flash("error", err.message);
			res.redirect("/venues/"+req.params.id);
		}else{
			//if so does the user own the comment?
			if(foundComment.author.id.equals(req.user._id) ){
			next()	
			}else{
				// req.flash("error", "You don't have permission to do that");
				res.redirect("/venues/"+req.params.id);
			}
		}
		})
	}else{
		// req.flash("error", "You need to be logged in to do that");
		res.redirect("/venues/"+req.params.id);
	}
}


module.exports= middlewareObj