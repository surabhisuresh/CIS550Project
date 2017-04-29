//dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var session = require('express-session');
var upload = require('express-fileupload');

var index = require('./routes/index');
//var search = require('./routes/search');
var users = require('./routes/users');
//var signIn = require('./routes/signIn');

//FB
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var fs = require('fs');
//var routes = require('./routes');
var http = require('http');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());



app.use('/', index);
//app.use('/search',search);
app.use('/users', users);


module.exports = app;
