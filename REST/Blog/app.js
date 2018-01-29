var express    = require("express"),
    mongoose   = require("mongoose"),
    bodyParser = require("body-parser"),
    app        = express(),
    methodOver = require("method-override"),
    expressSan = require("express-sanitizer");
    
mongoose.connect("mongodb://localhost/blogapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOver("_method"));
app.use(expressSan());

var blogSchema = new mongoose.Schema({
   title   : String,
   image   : String,
   body    : String,
   created : {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(rq, rs) {
    rs.redirect("/blogs");
})

app.get("/blogs", function(rq, rs){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else
        {
            rs.render("index", {blogs : blogs});
        }
    })
});

app.get("/blogs/new", function(rq, rs){
    rs.render("new");
})

app.get("/blogs/:id", function(rq, rs){
    Blog.findById(rq.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }
        else{
            rs.render("show", {blog: foundBlog});
        }
    });


});

app.get("/blogs/:id/edit", function(rq, rs){
     Blog.findById(rq.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        }
        else{
            rs.render("edit", {blog: foundBlog});
        }
    });
});

app.put("/blogs/:id", function(rq, rs){
    rq.body.blog.body = rq.sanitize(rq.body.blog.body);
    Blog.findByIdAndUpdate(rq.params.id, rq.body.blog, function(err){
        if(err)
        {
            rs.redirect("/blogs");
        }
        var url = "/blogs/" + rq.params.id;
        rs.redirect(url);
    })
});

app.post("/blogs", function(rq, rs){
    rq.body.blog.body = rq.sanitize(rq.body.blog.body);
    Blog.create(rq.body.blog, function(err, newBlog){
        if(err){
            rs.render("new");
        }
        else
        {
            rs.redirect("/blogs");
        }
    });
});

app.delete("/blogs/:id", function(rq, rs){
   Blog.findByIdAndRemove(rq.params.id, function(err){
       if(err){
           console.log(err);
       }
       else{
           rs.redirect("/blogs");
       }
   }) 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server for Blog App is running");
})