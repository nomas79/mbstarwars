const express = require('express');
const app = express(),
    fs = require('fs');

app.get('/*', function(req, res){     
    var filename = __dirname + '/dist/MbStarWars/' +  req.params[0];    
    fs.exists(filename, function (exists) {
        if (!exists) {            
            res.sendFile(__dirname + '/dist/MbStarWars/index.html');            
          } else {
            res.sendFile( __dirname + '/dist/MbStarWars/' + req.params[0]);             
          }
    });
    
    
});


// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
