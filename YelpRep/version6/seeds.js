var mongoose = require("mongoose");
var Rep = require("./models/rep");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Rep Mirante", 
        image: "https://static.panoramio.com.storage.googleapis.com/photos/large/87709531.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Rep Classe.h", 
        image: "https://s-ec.bstatic.com/images/hotel/max1024x768/410/41045169.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Reino Doce", 
        image: "https://static.tumblr.com/98861f232703c36b17cc1cf05cd149c8/wisyt0u/RIdnz1sxi/tumblr_static_tumblr_static__640.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
   //Remove all reps
   Rep.remove({}, function(err)
   {
        if(err){
            console.log(err);
        }
        console.log("removed reps!");

        Comment.remove({}, function(err) 
        {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few reps
            data.forEach(function(seed)
            {
                Rep.create(seed, function(err, rep)
                {
                    if(err){
                        console.log(err)
                    } 
                    else 
                    {
                        console.log("added a Rep");
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was more drugs",
                                author: "Ford"
                            },function(err, comment)
                            {
                                if(err){
                                    console.log(err);
                                } else {
                                    rep.comments.push(comment._id);
                                    rep.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
}

module.exports = seedDB;