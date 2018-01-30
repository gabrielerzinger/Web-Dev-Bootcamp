var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


router.get("/", function(rq, rs){
    rs.render("landing");
});

router.get("/register", function(rq, rs){
    rs.render("users/register.ejs");
});

router.post("/register", function(rq, rs){
     User.register(new User(
        {username : rq.body.username}),
        rq.body.password, function(err, user){
           if(err){
               console.log(err);
               return rs.render("/register");
           }else{
               passport.authenticate("local")(rq, rs, function(){
                   rs.redirect("/rep");
               });
           }
        });
});

router.get("/login", function(rq, rs){
   rs.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local", {
    successRedirect : "/reps",
    failureRedirect: "/login"
}) ,function(rq, rs){});

router.get("/logout", function(rq, rs){
    rq.logout();
    rs.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}


module.exports = router;