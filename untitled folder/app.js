var express     	= require("express"),
bodyParser  		= require("body-parser"),
mongoose    		= require("mongoose"),
passport			= require("passport"),
LocalStrategy		= require("passport-local"),
flash				=require("connect-flash"),
methodOverride		= require("method-override"),
Campground  		= require("./models/campground"),
Comment  			= require("./models/comment"),
User				= require("./models/user"),
seedDB      		= require("./seeds");
 
var commentRoutes 	= require("./routes/comments"),
campgroundRoutes	= require("./routes/campgrounds"),
authRoutes 			= require("./routes/index");

var app = express();

//IF SOMETHING HAPPENS TO OUR ENV VAR THE APP WILL NOT BE BROKEN IT WILL USE THE OTHER (IT'S LIKE HANDELING THE CODE)
var url = process.env.DATABASEURL || "mongodb://localhost/YelpCamp_App_2";
mongoose.connect(url , {
	useNewUrlParser : true , 
	useCreateIndex : true
}).then(()=> {
	console.log("Connected to DB!");
}).catch(error =>{
	console.log("ERROR" , err.message);
});

// mongoose.connect("mongodb+srv://Rare22:youcantbitch@cluster0-2wk7g.mongodb.net/<dbname>?retryWrites=true&w=majority" , {
// 	useNewUrlParser : true , 
// 	useCreateIndex : true
// }).then(()=> {
// 	console.log("Connected to DB!");
// }).catch(error =>{
// 	console.log("ERROR" , err.message);
// });
// console.log(process.env.DATABASEURL);


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//__dirname just for being safer
app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

// seedDB();

app.use(flash());
//PASSPORT CONFIGURATION 
app.use(require("express-session")({
	secret: "Raghad is going to be a big programmer",
	resave:false,
	saveUninitialize:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req ,res ,next){
	//PASSING A VARIBAL TO EVERY SINGLE TEMPLATE(WE CAN USE THEM THERE!)
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	
	//IF WE DONT WRITE THIS NEXT IT WILL ACTUALLY STOP 
	//NEXT TELLS IT TO MOVE TO THE NEXT CODE
	next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.get("/", function(req, res){
    res.render("landing");
});








//==============
//AUTH ROUTES
//==============



app.listen(process.env.PORT||3000, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});














