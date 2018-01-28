//note for myself: https://webdev-gabrielerzinger.c9users.io/
var express = require("express");
var app = express();

//rq is an object with all its information
//rs contains all information we're going to respond
app.get("/", function(rq, rs){
    rs.send("Hey");
});

app.get("/bye", function(rq, rs){
   rs.send("Bye");
});

app.get("/mid", function(rq, rs){
   rs.send("Mid!");
});

//using : to limit a pattern
//rq contains info about the rq
app.get("/r/:sub", function(rq, rs){

   rs.send("WELLCOME TO " + rq.params.sub.toUpperCase() + " SUBREDDIT! ");
});

app.get("/r/:sub/comments/:id/:title", function(rq, rs){
   rs.send("oh wow, its a post"); 
});

//The star ( '*' ) can be used when dealing with unrecognized urls.
app.get("*", function(rq, rs){
   rs.send("Sorry, I dont know what you're trying to do.");
});

//process.env.{} for C9 right ports and ip
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});
