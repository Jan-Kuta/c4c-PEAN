var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var index = require('./routes/index');
var userRoute = require('./routes/user');
var countryRoute = require('./routes/country');
var areaRoute = require('./routes/area');
var sectorRoute = require('./routes/sector');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Initialise Passport before using the route middleware
app.use(passport.initialize());

app.use('/api/user', userRoute);
app.use('/api/country', countryRoute);
app.use('/api/area', areaRoute);
app.use('/api/sector',sectorRoute);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if(err){
    console.log('TBD Error: ', err);
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

module.exports = app;
