var express = require("express");
var router= express.Router();
var Venue= require("../models/venue");
var middleware= require("../middleware")


//index
router.get("/", function(req, res){
	Venue.find({}, function(err, venue){
		if(err){
			console.log(err)
		}else{
			res.render("venues/index", {venue: venue})
		}
	})
})

//new route 
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("venues/new");
})
//create route
router.post("/", middleware.isLoggedIn, function(req, res){
	var newVenue= req.body.venue
	Venue.create(newVenue, function(err, newlyCreated){
		if (err){
			console.log(err)
		}else{
			res.redirect("/venues")
		}
	})
})

//show route
router.get("/:id", function(req,res){
	Venue.findById(req.params.id).populate("comments").exec(function(err, foundVenue){
		if (err){
			console.log(err)
		}else {
			res.render("venues/show", {venue:foundVenue})
		}
	})
})

//EDIT ROUTE
//render edit form
router.get("/:id/edit", function(req,res){
	Venue.findById(req.params.id, function(err, foundVenue){
		if(err){
			console.log(err)
			res.redirect("/venues/"+req.params.id)
		}else{
			res.render("venues/edit", {venue: foundVenue});
		}
	})
})

router.put("/:id", function(req, res){
	Venue.findByIdAndUpdate(req.params.id, req.body.venue, function(err, updatedVenue){
		if (err){
			res.redirect("/venues")
		}else{
			res.redirect("/venues/"+req.params.id)
		}
	})
})

router.delete("/:id", function(req,res){
	Venue.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send(err)
		}else{
			res.redirect("/venues");
		}
	})
})
module.exports= router;