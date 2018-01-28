//note for myself: https://webdev-gabrielerzinger.c9users.io/
var express = require("express");
var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(rq, rs){
    rs.render("home");
    //rs.send("<h1>Welcome to the home page!</h1>");
});

app.get("/fallinlovewith/:thing", function(rq,rs){
   var str = rq.params.thing;
   rs.render("love", {thisis:str});
});

app.get("/posts", function(rq, rs){
   var posts = [
        {title: "Xrp is up", author:"XrpFan"},
        {title: "Xrp is down", author:"STLFan"},
        {title: "XRP ScamCoin", author:"Noob"}
       ];
    
    rs.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});
