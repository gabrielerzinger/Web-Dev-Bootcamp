var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");
    

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_rep");

//schema Setup
var repSchema = new mongoose.Schema({
    name  : String,
    image : String
});

var Rep = mongoose.model("Rep", repSchema);


app.get("/", function(rq, rs){
    rs.render("landing");
})

app.get("/reps", function(rq, rs){
    //    rs.render("republicas", {republicas : republicas});
    Rep.find({}, function(err, allreps){
        if(err) console.log(err);
        else{
            rs.render("republicas", {republicas: allreps});
        }
    });
});

app.post("/reps", function(rq, rs){
    var name = rq.body.name;
    var image = rq.body.image;

    Rep.create(
        {
            name: name,
            image : image
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

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started.");
});