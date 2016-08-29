var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.set('views', './api/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//Triggered when a user try to acess a Unauthorized route
	app.use(function (err, req, res, next) {
  	if (err.name === 'UnauthorizedError') {
    	res.status(401);
    	res.json({"message" : err.name + ": " + err.message});
  	}
	});

	require('../api/routes/index.server.routes.js')(app);
	require('../api/routes/users.server.routes.js')(app);
	require('../api/routes/question.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};
