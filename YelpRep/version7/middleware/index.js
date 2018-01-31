var middlewareObj = {};
var Rep = require("../models/rep");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}


middlewareObj.checkComOwnership = function checkComOwnership(rq, rs, next){
    if(rq.isAuthenticated())
    {
        Comment.findById(rq.params.comments_id, function(err, foundCom){
        if(err){
            console.log(err);
            rs.redirect("back");
        }
        else{
            if( foundCom.author.id.equals(rq.user._id) ){
                next();
            }
            else{
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


middlewareObj.checkOwnership = function checkOwnership(rq, rs, next){
    if(rq.isAuthenticated())
    {
        Rep.findById(rq.params.id, function(err, foundRep){
        if(err){
            console.log(err);
            rs.redirect("back");
        }
        else{
            if( foundRep.author.id.equals(rq.user._id) ){
                next();
            }
            else{
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