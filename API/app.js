//note for myself: https://webdev-gabrielerzinger.c9users.io/
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");



app.get("/", function(rq, rs) {
    rs.render("search");
})


//rq is an object with all its information
//rs contains all information we're going to respond
app.get("/results", function(rq, rs){
   var q = rq.query.search;
   var url = "http://www.omdbapi.com/?s=" + q + "&apikey=thewdb";
   //"http://www.omdbapi.com/?s=star+wars&apikey=thewdb"
   request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
         var parsedData = JSON.parse(body);
         rs.render("results", {data: parsedData});
      }
   });
   
});

//process.env.{} for C9 right ports and ip
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});
