'use strict';

// Load required packages
var express = require('express'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler');

    
// Set default node environment to development
var env = process.env.NODE_ENV || 'development';

// Setup server
var app = express(),
    port = process.env.PORT || 8080;

var staticOptions = {
    dotfiles: 'ignore',
    etag: true,
    extensions: ['htm', 'html'],
    index: 'index.html',
    lastModified:true,
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
      res.header('Cache-Control', 'public, max-age=1d');
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
}

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

app.use('/', express.static('public', staticOptions ));

app.use(morgan('dev'));

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Start the server
app.listen(port, function(){
  console.log('server running on port ' + port);
});  

// Expose app
module.exports = app;
