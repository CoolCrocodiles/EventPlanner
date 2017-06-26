var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser());
// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.post('/events', function(req, res) {
  var result = [];
  var month = '';
  console.log("****************req.body:  ", req.body);


  console.log("Post request Got !!! ");
  switch (req.body.eventDate.slice(0, 2)) {
    case '01':
        month = "January";
        break;
    case '02':
        month = "February";
        break;
    case '03':
        month = "March";
        break;
    case '04':
        month = "April";
        break;
    case '05':
        month = "May";
        break;
    case '06':
        month = "June";
        break;
    case '07':
        month = "July";
        break;
    case '08':
        month = "August";
        break;
    case '09':
        month = "September";
        break;
    case '10':
        month = "October";
        break;
    case '11':
        month = "November";
        break;
    case '12':
        month = "December";
        break;
  }

  var day = req.body.eventDate.slice(3);
  console.log("**********day ", day);
  console.log("**********month ", month);
  console.log("******** %%%my url: ", `http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=${req.body.eventSelected}&l=${req.body.eventLocation}&when=${month}+${day}`);

  var options = {
    url: `http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=${req.body.eventSelected}&l=${req.body.eventLocation}&when=${month}+${day}`,
    method: 'GET'

      // !!!!!!!!!!! fixed DATE !!!!!!!!!!!!!!!!!
      //http://api.eventful.com/json/events/search?app_key=HXWRVg4cwThzKRdQ&q=concerts&l=las+vegas&when=July+4
  }
  request(options, function(err, response, body){
    console.log("******* API response.body", JSON.parse(body));
    res.send(JSON.parse(body).events.event);
  });
  // res.send('Helloooooo!');
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

