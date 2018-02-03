var middlewareObj = {};
var Rep = require("../models/rep");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login in order to do that.");
    res.redirect("/login");
    
}


middlewareObj.checkComOwnership = function checkComOwnership(rq, rs, next){
    if(rq.isAuthenticated())
    {
        Comment.findById(rq.params.comments_id, function(err, foundCom){
        if(err || !foundCom)  {
            console.log(err);
            rq.flash("error", "Error: comment not found. Please, try again later.");
            rs.redirect("back");
        }
        else{
            if( foundCom.author.id.equals(rq.user._id) ){
                next();
            }
            else{
                rq.flash("error", "You do not have permissions to do that.");
                rs.redirect("back");
            }
        }
        });
    }
    else
    {
        rq.flash("error", "You need to login in order to do that.");
        rs.redirect("back");
    }
}


middlewareObj.checkOwnership = function checkOwnership(rq, rs, next){
    if(rq.isAuthenticated())
    {
        Rep.findById(rq.params.id, function(err, foundRep){
        if(err || !foundRep){
            rq.flash("error", "Error: Sorry, couldn't find the desired Rep.");
            rs.redirect("back");
        }
        else{
            if( foundRep.author.id.equals(rq.user._id) ){
                next();
            }
            else{
                rq.flash("error", "Sorry, you do not have permissions to do that.");
                rs.redirect("back");
            }
        }
        });
    }
    else
    {
        rs.redirect("back");
    }
}


module.exports = middlewareObj;