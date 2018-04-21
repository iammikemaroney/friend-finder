// required dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// configure express
var app = express();
var PORT = process.env.PORT;

var app = express();

// set the port
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// add middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.static('./app/public'))

// add the application routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// start listening on PORT
app.listen(PORT, function() {
  console.log('Friend Finder app is listening on PORT: ' + PORT);
});