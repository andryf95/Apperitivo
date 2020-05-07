var express = require("express");
var mongoose = require("mongoose");
var bodyParser= require("body-parser");
var seedDB = require("./seeds");
var Venue = require("./models/venue");
var Comment= require("./models/comment");
var passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	User			= require("./models/user"),
	passportLocalMongoose = require("passport-local-mongoose"),
	middleware	= require("./middleware");
var commentRoutes = require("./routes/comments"),
	venueRoutes = require("./routes/venues"),
	indexRoutes = require("./routes/index"),
	methodOverride	= require("method-override");

var app= express();
app.use(express.static(__dirname + '/public'));
seedDB();


var url= process.env.DATABASEURL || "mongodb://localhost:27017/apperitivo";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() =>{
		console.log("Connected to DB");
	}).catch(err =>{
		console.log("ERROR:", err.message);
	});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// PASSPORT CONFIG
app.use(require("express-session")({
	secret: "We love our Negroniss",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/venues", venueRoutes);
app.use("/", indexRoutes);
app.use("/venues/:id/comments", commentRoutes)


//var PORTIP= (process.env.PORT, process.env.IP) || 3000
//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(3000, function(){
	console.log("Servicing Apperitivo")
})
