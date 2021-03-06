var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Rep        = require("./models/rep"),
    seedDB     = require("./seeds");
    

seedDB();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_rep");

app.get("/", function(rq, rs){
    rs.render("landing");
})

app.get("/reps", function(rq, rs){
    //    rs.render("republicas", {republicas : republicas});
    Rep.find({}, function(err, allreps){
        if(err) console.log(err);
        else{
            rs.render("index", {republicas: allreps});
        }
    });
});

app.post("/reps", function(rq, rs){
    var name        = rq.body.name;
    var image       = rq.body.image;
    var description = rq.body.description;
    
    Rep.create(
        {
            name        : name,
            image       : image,
            description : description
        },function(err, rep){
            if(err) 
            {
                console.log(err);
            }
            else
            {
                console.log(rep);
            }
    });
    
    
    rs.redirect("/reps");
});

app.get("/reps/new", function(rq, rs){
   rs.render("new.ejs");
});

app.get("/reps/:id", function(rq, rs){
    //Show a specific rep
    var showId = rq.params.id;
    Rep.findById(showId, function(err, foundRep){
       if(err){
           console.log(err);
       } 
       rs.render("show", {rep: foundRep});
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started.");
});