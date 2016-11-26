process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var path = require('path');
var expr = require('express');

var db = mongoose(),
	app = express();


app.listen(config.port);
console.log(__dirname);
app.use(expr.static(path.join(__dirname, 'public')));


module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
