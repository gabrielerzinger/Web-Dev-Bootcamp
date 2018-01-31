var express = require("express");
var router  = express.Router({mergeParams:true});
var Rep     = require("../models/rep");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments new form
router.get("/new", middleware.isLoggedIn ,function(rq, rs) 
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
router.post("/", middleware.isLoggedIn, function(rq, rs){
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

router.get("/:comments_id/edit", middleware.checkComOwnership,function(rq,rs){
    Comment.findById(rq.params.comments_id, function(err, foundCom){
       if(err){
           rs.redirect("back");
       } 
       else{
            console.log(foundCom);
            rs.render("comments/edit.ejs", {repid: rq.params.id, comment: foundCom});
       }
    });
});

router.put("/:comments_id", middleware.checkComOwnership,function(rq,rs){
   Comment.findByIdAndUpdate(rq.params.comments_id, rq.body.comment, function(err, newCom){
       if(err){
           rs.redirect("back");
       }
       else{
           rs.redirect("/reps/" + rq.params.id);
       }
   });
});

router.delete("/:comments_id", middleware.checkComOwnership,function(rq,rs){
   Comment.findByIdAndRemove(rq.params.comments_id, function(err){
       if(err){
           rs.redirect("back");
       }
       else{
           rs.redirect("/reps/"+rq.params.id);
       }
   });
    
});


module.exports = router;