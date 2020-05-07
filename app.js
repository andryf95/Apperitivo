var express = require("express");
var mongoose = require("mongoose");
var bodyParser= require("body-parser");
var seedDB = require("./seeds");
var Venue = require("./models/venue");
var Comment= require("./models/comment");

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


app.get("/", function(req, res){
	res.render("landing")
})

app.get("/locations", function(req, res){
	Venue.find({}, function(err, venue){
		if(err){
			console.log(err)
		}else{
			res.render("locations", {venue: venue})
		}
	})
	
})

//var PORTIP= (process.env.PORT, process.env.IP) || 3000
//app.listen(process.env.PORT, process.env.IP, function(){
app.listen(3000, function(){
	console.log("Servicing Apperitivo")
})
