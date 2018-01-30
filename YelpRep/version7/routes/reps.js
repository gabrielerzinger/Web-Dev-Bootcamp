var express = require("express");
var router  = express.Router();
var Rep     = require("../models/rep");
var Comment = require("../models/comment");

router.get("/", function(rq, rs){
    //    rs.render("republicas", {republicas : republicas});
    Rep.find({}, function(err, allreps){
        if(err) console.log(err);
        else{
            rs.render("reps/index", {republicas: allreps, currUser: rq.user});
        }
    });
});

router.post("/", isLoggedIn, function(rq, rs){
    var name        = rq.body.name;
    var image       = rq.body.image;
    var description = rq.body.description;
    var author      = {
        id  : rq.user._id,
        username : rq.user.username
    };
    var newRep      = {name : name, image : image, description : description, author: author};
    
    Rep.create(newRep, function(err, rep){
        if(err) 
        {
            console.log(err);
        }
        else
        {
            console.log(rep);
        }
    });
    
    
    rs.redirect("/reps");
});

router.get("/new", isLoggedIn ,function(rq, rs){
   rs.render("reps/new.ejs");
});

router.get("/:id", function(rq, rs){
    //Show a specific rep
    Rep.findById(rq.params.id).
        populate("comments").
            exec( function(err, foundRep){
               if(err){
                   console.log(err);
               } 
               console.log(foundRep);
               rs.render("reps/show", {rep: foundRep});
            });
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}


module.exports = router;