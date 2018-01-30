var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Rep        = require("./models/rep"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment");

    

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_rep");
seedDB();

app.get("/", function(rq, rs){
    rs.render("landing");
})

app.get("/reps", function(rq, rs){
    //    rs.render("republicas", {republicas : republicas});
    Rep.find({}, function(err, allreps){
        if(err) console.log(err);
        else{
            rs.render("reps/index", {republicas: allreps});
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
   rs.render("reps/new.ejs");
});

app.get("/reps/:id", function(rq, rs){
    //Show a specific rep
    Rep.findById(rq.params.id).
        populate("comments").
            exec( function(err, foundRep){
               if(err){
                   console.log(err);
               } 
               console.log(foundRep);
               rs.render("reps/show", {rep: foundRep});
            });
});

app.get("/reps/:id/comments/new", function(rq, rs) {
    Rep.findById(rq.params.id, function(err, rep){
        if(err){
            console.log(err);
        }
        else
        {
            rs.render("comments/new", {rep:rep});
        }
    });
});

app.post("/reps/:id/comments", function(rq, rs){
   Rep.findById(rq.params.id, function(err, rep){
       if(err) {
           console.log(err);
           rs.redirect("/reps");
       }
       else{
           Comment.create(rq.body.comment, function(err, comment){
               if(err){
                   console.log(err);
                   rs.redirect("/reps");
               }
               else{
                   rep.comments.push(comment._id);
                   rep.save();
                   rs.redirect("/reps/" + rep._id);
               }
           })
       }
   }) 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp Camp Server has started.");
});