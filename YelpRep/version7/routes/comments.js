var express = require("express");
var router  = express.Router({mergeParams:true});
var Rep     = require("../models/rep");
var Comment = require("../models/comment");

//Comments new form
router.get("/new", isLoggedIn ,function(rq, rs) 
{
    Rep.findById(rq.params.id, function(err, rep){
        if(err){
            console.log(err);
        }
        else
        {
            rs.render("comments/new", {rep:rep});
        }
    });
});

//Comments create
router.post("/", isLoggedIn, function(rq, rs){
   Rep.findById(rq.params.id, function(err, rep){
       if(err) {
           console.log(err);
           rs.redirect("/reps");
       }
       else{
           Comment.create(rq.body.comment, function(err, comment){
               if(err){
                   console.log(err);
                   rs.redirect("/reps");
               }
               else{
                   //add username and id to comment
                   comment.author.id = rq.user._id;
                   comment.author.username = rq.user.username;
                   comment.save();
                   rep.comments.push(comment._id);
                   rep.save();
                   rs.redirect("/reps/" + rep._id);
               }
           })
       }
   }) 
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