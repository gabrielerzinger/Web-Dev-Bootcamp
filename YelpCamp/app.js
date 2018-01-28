var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var republicas = [
            {name: "Mirante", image : "https://farm5.staticflickr.com/4142/5220538184_514c4376aa.jpg"},
            {name: "Estado Novo", image: "https://farm1.staticflickr.com/15/20328206_c2d6ea0b6b.jpg"},
            {name: "Repper", image: "https://farm4.staticflickr.com/3889/14393153228_205eaae93c.jpg"},
            {name: "Mirante", image : "https://farm5.staticflickr.com/4142/5220538184_514c4376aa.jpg"},
            {name: "Estado Novo", image: "https://farm1.staticflickr.com/15/20328206_c2d6ea0b6b.jpg"},
            {name: "Mirante", image : "https://farm5.staticflickr.com/4142/5220538184_514c4376aa.jpg"},
            {name: "Estado Novo", image: "https://farm1.staticflickr.com/15/20328206_c2d6ea0b6b.jpg"},
            {name: "Mirante", image : "https://farm5.staticflickr.com/4142/5220538184_514c4376aa.jpg"},
            {name: "Estado Novo", image: "https://farm1.staticflickr.com/15/20328206_c2d6ea0b6b.jpg"},
            {name: "Mirante", image : "https://farm5.staticflickr.com/4142/5220538184_514c4376aa.jpg"},
            {name: "Estado Novo", image: "https://farm1.staticflickr.com/15/20328206_c2d6ea0b6b.jpg"}
        ];

app.get("/", function(rq, rs){
    rs.render("landing");
})

app.get("/reps", function(rq, rs){
    rs.render("republicas", {republicas : republicas});
});

app.post("/reps", function(rq, rs){
    var name = rq.body.name;
    var image = rq.body.image;
    var newRep = {name: name, image: image};
    republicas.push(newRep);
    rs.redirect("/reps");
});

app.get("/reps/new", function(rq, rs){
   rs.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started.");
});