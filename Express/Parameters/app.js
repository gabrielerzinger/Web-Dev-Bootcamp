//note for myself: https://webdev-gabrielerzinger.c9users.io/
var express = require("express");
var app = express();

app.get("/", function(rq, rs){
    rs.send("Hi there wellcome to my assignment!");
});

app.get("/speak/:anm", function(rq, rs){
   if(rq.params.anm === "pig"){
    rs.send("ping do oink");
   }
   else if(rq.params.anm === "cow")
   {
       rs.send("cow do cow sound");
   }
});

app.get("/repeat/:str/:t", function(rq, rs){
    var ret = "";
    for(var i = 0; i < parseInt(rq.params.t); ++i)
    {
        ret += (rq.params.str) + " ";
    }
    rs.send(ret);
    
});

app.get("*", function(rq, rs){
    rs.send("url not found");
});

//process.env.{} for C9 right ports and ip
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});
