var mongoose = require("mongoose");

var repSchema = new mongoose.Schema({
    name        : String,
    price       : String,
    image       : String,
    description : String,
    comments    : [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ], 
   author       :
   {
       id:{
           type :mongoose.Schema.Types.ObjectId,
           ref  :"User"
       },
       username: String
   }
},
{ usePushEach: true} );

module.exports = mongoose.model("Rep", repSchema);


/*
Rep.create({
    name        : "Mirante",
    image       : "http://www.photosforclass.com/download/3853609644",
    description : "Study Only. No party. No Pizza."
}, function(err, rep){
    console.log(rep);
})*/



