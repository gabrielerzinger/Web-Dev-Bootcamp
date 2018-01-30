var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/associations");


var postSchema = new mongoose.Schema({
   title   : String,
   content : String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email : String,
    name  : String,
    posts : [postSchema]
});

var User = mongoose.model("User", userSchema);

User.findOne({name: "Alicia Stone"}, function(err, user){
   if(err){
       console.log(err);
   } 
   else{
        user.posts.push({
            title  : "a title",
            content: "a content"
        });
        user.save(function(){});
       console.log(user);
   }
});