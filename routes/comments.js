var express = require("express");
var router= express.Router();
var Venue= require("../models/venue");
var middleware= require("../middleware")
var Comment= require("../models/comment")

//COMMENT ROUTES
//NEW
router.get("/new",middleware.isLoggedIn, function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		if (err){
			console.log(err)
		}else{
			res.render("comments/new", {venue: venue})
		}
	})
})
//CREATE	
router.post("/",middleware.isLoggedIn, function(req, res){
	Venue.findById(req.params.id, function(err, venue){
		if (err){
			console.log(err);
		}else{
			console.log(req.params.id)
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username
					comment.save();
					venue.comments.push(comment);
					venue.save();
					res.redirect("/venues/"+ venue._id)
				}
			})
		}
	})
})

//EDIT ROUTE
//render edit form
router.get("/:comment_id/edit", function(req,res){
	console.log(req.params.id)
	Venue.findById(req.params.id, function(err, venue){
		if (err){
			console.log(err);
		}
		console.log(req.params.id)
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				console.log(err)
				res.redirect("/venues/"+req.params.id)
			}else{
				
				res.render("comments/edit", {venue_id:req.params.id, comment: foundComment});
				console.log(req.params.id)
			}
		})

	})
})

router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			console.log(err)
		}else{
			res.redirect("/venues/"+req.params.id);
		}
	})
})


module.exports= router;