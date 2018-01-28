var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movie_app");

var movieSchema = new mongoose.Schema({
    name: String,
    year: Number,
    genre: String
});

var Movie = mongoose.model("Movie", movieSchema);

/*add new movie to db
var sw = new Movie({
    name: "Modern Family: The Movie",
    year: 2015,
    genre: "Comedy"
});

sw.save(function(err, mv){
    if(err){
        console.log("Bad");
    }
    else{
        console.log("Movie saved");
        console.log(mv);
    }
});
*/
/*
Movie.create({
    name: "Batman",
    year: 2015,
    genre: "Drama"
}, function(err, movie){
    if(err){
        console.log("error");
    }else{
        console.log(movie);
    }
});*/

//retrieve all movie
Movie.find({genre: "Comedy"}, function(err, movies){
    if(err){
        console.log("Error found");
        console.log(err);
    }
    else
    {
        console.log(movies);
    }
})