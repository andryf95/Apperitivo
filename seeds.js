var mongoose	= require("mongoose"),
	Venue		= require("./models/venue"),
	Comment		= require("./models/comment");

var data = [
	{
		name: "Ai 3 Porcellini",
		image: "https://images.unsplash.com/photo-1576661929310-a29e8fc38c7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
		description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author:{
			username:"Lisa Simpson",
			id: "588c2e092403d111454fff71"}
    },
	{
		name: "Stinky Pretzel",
		image: "https://images.unsplash.com/photo-1560840881-4bbcd415a9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author:{
			username:"Bart Simpson",
			id:"588c2e092403d111454fff77"
			}
    
	},
	{
		name: "Al Vespino",
		image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
		description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author:{
			username: "Homer Simpson",
			id: "588c2e092403d111454fff76"}
    
	},
	{
		name: "Pomodoro e Mozzarella",
		image: "https://images.unsplash.com/photo-1569230516306-5a8cb5586399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
		author:{
			username: "Homer Simpson",
			id: "588c2e092403d111454fff76"}
    
	}
];

function seedDB(){
	//remove everything existent
	Venue.deleteMany({}, function(err){
		if (err){
			console.log(err);
		}
		console.log("removed venue")
		Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Venue.create(seed, function(err, venue){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a venue");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author:{
			username: "Homer Simpson",
			id: "588c2e092403d111454fff76"}
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    venue.comments.push(comment);
                                    venue.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;
