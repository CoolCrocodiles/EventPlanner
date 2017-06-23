var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.post('/events', function(req, res) {
  var result = [];
  var options = {
      // url: `http://theastrologer-api.herokuapp.com/api/horoscope/${req.body.mySign}/yesterday`,
      url: `http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=${req.body.eventSelected}&l=${req.body.eventLocation}='2017072500-2017072700'`,
      
      // !!!!!!!!!!! fixed DATE !!!!!!!!!!!!!!!!!
      //http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=concerts&l=las+vegas&when=July+4
      
      method: 'GET'
    }
    request(options, function(err, response, body){
      res.send(result);
    }
});



app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

