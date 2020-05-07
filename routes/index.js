var express = require("express");
var router= express.Router();
var passport= require("passport")
var User= require("../models/user")


//landing
router.get("/", function(req, res){
	res.render("venues/landing")
})

//AUTH ROUTES
//render registration form
router.get("/register", function(req, res){
	res.render("index/register")
})
//handle registration logic
router.post("/register", function(req, res){
	var newUser= new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err)
			return res.render("index/register")
		}else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/venues")
			})
		}
	})
})
//render login form
router.get("/login", function(req,res){
	res.render("index/login");
})
//handle login logic
router.post("/login",passport.authenticate("local",{
	successRedirect: "/venues",
	failureRedirect: "/login"
}), function(req,res){})

//LOGOUT
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})



module.exports= router;