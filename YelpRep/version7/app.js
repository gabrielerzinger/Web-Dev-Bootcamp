//Requires setup
var bodyParser    = require("body-parser"),
    Comment       = require("./models/comment"),
    commentRoutes = require("./routes/comments"),
    express       = require("express"),
    indexRoutes   = require("./routes/index"),
    LocalStrategy = require("passport-local"),
    LocalMongoose = require("passport-local-mongoose"),
    mongoose      = require("mongoose"),
    methodOverride= require("method-override"),
    passport      = require("passport"),
    Rep           = require("./models/rep"),
    repsRoutes    = require("./routes/reps"),
    seedDB        = require("./seeds"),
    User          = require("./models/user");

//App+express setup
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Authentication setup
app.use(require("express-session")({
    secret            : "Violent delights have violent endings",
    resave            : false,
    saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Connect and seed the database
mongoose.connect("mongodb://localhost/yelp_rep");
//seedDB(); 

//Pass currUser to all templates
app.use(function(req, res, next){
    res.locals.currUser = req.user;
    next();
});

//Require routes
app.use(indexRoutes);
app.use("/reps/:id/comments",commentRoutes);
app.use("/reps", repsRoutes);

//c9.io configurations
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started.");
});

