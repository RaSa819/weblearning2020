//-----------campgrounds.js--------------

var router 				= express.Router();
var Campground  		= require("../models/campground");
var middleware 		 	= require("../middleware");


//INDEX - show all campgrounds
router.get("/", function(req, res){
	// console.log(req.user);
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});



//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn ,function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
	var price = req.body.price;
    var desc = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
    var newCampground = {name: name, image: image, price:price, description: desc , author:author}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {

            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn ,function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});




//EDIT CAMPGROUND ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnerShip,function(req ,res){
	
	
			Campground.findById(req.params.id , function(error , foundCampground){
				
				res.render("campgrounds/edit" , {campground:foundCampground});
		});
});

//UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
	
	Campground.findByIdAndUpdate(req.params.id , req.body.campground ,function(error , UpadatedCampground){
		if(error){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}

	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id" ,middleware.checkCampgroundOwnerShip, function(req ,res ){
	Campground.findByIdAndRemove(req.params.id , function(error){
		if(error){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});


// //MIDDLEWARE
// function isLoggedIn(req ,res ,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// };

module.exports = router;


//----------------------------------












//---------comments.js---------------

var express = require("express");
var router = express.Router({mergeParams : true});
var Campground          = require("../models/campground"),
Comment                 = require("../models/comment"),
middleware              = require("../middleware"),
User                    = require("../models/user");

//============================
//COMMENT ROUTES
//============================


//NEW COMMENT ROUTE 
router.get("/new" ,middleware.isLoggedIn , function(req , res){
    Campground.findById(req.params.id , function(error , foundCampground){
        if(error){
            console.log(error);
            res.redirect("/campgrounds");
        }else{
            res.render("comments/new" , {campground:foundCampground});
        }
    });
    
    
});



//CREATE ROUTE
router.post("/", middleware.isLoggedIn , function(req , res){
    Campground.findById(req.params.id , function(error , campground){
        if(error){
            console.log(error);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment , function(error , comment){
                if(error){
                    console.log(error);
                    // 
                }else{
                    //ADD USERNAME AND ID TO COMMENT
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //SAVE THE COMMENT
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success" , "Successfully created comment");
                res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


//COMMENT EDIT ROUTE
router.get("/:comment_id/edit" , middleware.checkCommentOwnerShip , function(req ,res){
    Comment.findById(req.params.comment_id , function(error , foundComment){
        if(error){
            res.redirect("back");
            
        }else{
            
        res.render("comments/edit" , {campground_id:req.params.id , comment:foundComment});
        }
    });
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id"  ,middleware.checkCommentOwnerShip ,function(req , res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment , function(error , foundComment){
        if(error){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id );
        }
    });
    
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id" ,middleware.checkCommentOwnerShip , function(req ,res){
    Comment.findByIdAndRemove(req.params.comment_id , function(error){
        if(error){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})




//MIDDLEWARE in separate file





module.exports = router;


//--------------------------------------




//--------------index.js-------------------


var express = require("express");
var router = express.Router();
var passport            = require("passport"),
User                    = require("../models/user");

//SHOW THE REGISTER FORM
router.get("/register" , function(req ,res){
    res.render("register");
});

//HANDLE THE SIGN UP LOGIC
router.post("/register" , function(req ,res){
    var newUser =new User({username:req.body.username});
    User.register(newUser , req.body.password , function(error ,user){
        if(error){
            req.flash("error" , error.message);
            
            return res.render("register");
        }
        passport.authenticate("local")(req ,res ,function(){
            req.flash("success" , "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
         });
    });
});

//SHOW LOGIN FORM
router.get("/login" , function(req , res){
        res.render("login");
        });


//HANDELING LOGIN LOGIC
//IN THE LOGIN WE NEED MIDDLEWARE
router.post("/login" , passport.authenticate("local" , 
    {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
    
}
) ,  function(req ,res){
    
});

//LOGOUT ROUTE
router.get("/logout" , function(req ,res){
    req.logout();
    req.flash("success", "Logged you out..");
    res.redirect("/campgrounds");
});


//MIDDLEWARE
// function isLoggedIn(req ,res ,next){
//  if(req.isAuthenticated()){
//      return next();
//  }
//  req.flash("error" , "You need to be logged in to do that");
//  res.redirect("/login");
// };

module.exports = router;



//----------------------------------------------





