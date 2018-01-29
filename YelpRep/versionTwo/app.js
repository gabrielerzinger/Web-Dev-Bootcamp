var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_rep");

var repSchema = new mongoose.Schema({
    name        : String,
    image       : String,
    description : String
});

var Rep = mongoose.model("Rep", repSchema);

/*
Rep.create({
    name        : "Mirante",
    image       : "http://www.photosforclass.com/download/3853609644",
    description : "Study Only. No party. No Pizza."
}, function(err, rep){
    console.log(rep);
})*/


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

var port = process.env.PORT || 3000;
app.listen(port , function(){
   console.log("Yelp Camp Server has started.");
});