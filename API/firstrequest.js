var request = require('request');
request('http://www.omdbapi.com/?s=star+wars&apikey=thewdb', function (error, response, body){
    if(error){
        console.log(error)
    }
    else {
        if(response.statusCode == 200)
            console.log(JSON.parse(body))
    }
});