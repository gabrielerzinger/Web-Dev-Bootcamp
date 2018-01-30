var express    = require("express"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    bodyParser = require("body-parser"),
    localStr   = require("passport-local"),
    localMong  = require("passport-local-mongoose"),
    User       = require("./models/user");
var app = express();
    

mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(require("express-session")({
    secret            : "violent delights have violent endings",
    resave            : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

passport.use(new localStr(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================
// ROUTES
//==================

app.get("/", function(rq, rs){
   rs.render("home");
});

app.get("/secret", isLoggedIn, function(rq, rs){
    rs.render("secret");
});

app.get("/register", function(rq, rs){
   rs.render("signup");
});

app.post("/register", function(rq, rs){
    User.register(new User(
        {username : rq.body.username}),
        rq.body.password, function(err, user){
           if(err){
               console.log(err);
               return rs.render("/register");
           }else{
               passport.authenticate("local")(rq, rs, function(){
                   rs.redirect("/secret");
               })
           }
        });
});

app.get("/login", function(rq, rs){
    rs.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect : "/secret",
    failureRedirect: "/login"
}) ,function(rq, rs){});

app.get("/logout", function(rq, rs){
    rq.logout();
    rs.redirect("/");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});