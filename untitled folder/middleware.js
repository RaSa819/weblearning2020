//==================middleware/index.js=======================


var Campground = require("../models/campground"),
Comment 	   = require("../models/comment");
//ALL THE MIDDLEWARE GOES HERE
var middlewareObj = {}

//NO ONE CAN SEND REQUEST IF THEIR NOT LOGGED IN
middlewareObj.checkCampgroundOwnerShip = function (req ,res, next){
	
	if(req.isAuthenticated()){
			Campground.findById(req.params.id , function(error , foundCampground){
		if(error){
			req.flash("error" , "Campground not found");
			res.redirect("back");
		}else{
		//DOES USER OWN THE CAMPGROUND?
		if(foundCampground.author.id.equals(req.user._id)){
			next();
			
		}else{
			req.flash("error" , "You don't have permission to do that");
			res.redirect("back");
		}
		}
	});
	}else{
		req.flash("error" , "You need to be logged in to do that");
		res.redirect("back");
	}
	
	
};
middlewareObj.checkCommentOwnerShip = function(req ,res, next){
	if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id , function(error , foundComment){
		if(error){
			res.redirect("back");
		}else{
		//DOES USER OWN THE COMMENT?
		if(foundComment.author.id.equals(req.user._id)){
			next();
			
		}else{
			req.flash("error" , "You don't have permission to do that");
			res.redirect("back");
		}
		}
	});
	}else{
		req.flash("error" , "You need to be logged in to do that");
		res.redirect("back");
	}
	
	
};


middlewareObj.isLoggedIn = function(req ,res ,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error" , "You need to login to do that!");
	res.redirect("/login");
};


module.exports = middlewareObj;