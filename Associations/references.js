var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog2");


var postSchema = new mongoose.Schema({
   title   : String,
   content : String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email : String,
    name  : String,
    posts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

Post.create({
   title  : "How to cook the best burger pt2",
   content: "lorem ipsum ad samet"
}, function(err, post){ 
    User.findOne({name : "bob"}, function(err, foundUser){
       foundUser.posts.push(post._id);
       foundUser.save();
       console.log(foundUser);
    });
});