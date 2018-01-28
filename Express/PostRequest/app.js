var express = require("express");
var faker = require("faker");
var parser = require("body-parser");


var app = express();

app.set("view engine", "ejs");
app.use(parser.urlencoded({extended : true}));

var friends = [faker.fake("{{name.firstName}}"), faker.fake("{{name.firstName}}"), faker.fake("{{name.firstName}}"), faker.fake("{{name.firstName}}"), faker.fake("{{name.firstName}}"), faker.fake("{{name.firstName}}")];

app.get("/", function(rq, rs){
    rs.render("home");
})

app.get("/friends", function(rq, rs){
   rs.render("friends", {friends: friends}); 
});

//post route to add data
app.post("/addfriend", function(rq,rs){
    
    friends.push(rq.body.nf);
    rs.render("friends", {friends:friends});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Started");
});