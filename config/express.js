var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	flash = require('connect-flash'),
	session = require('express-session');

module.exports = function() {
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.set('views', './api/views');
	app.set('view engine', 'ejs');

	app.use(flash());


	require('../config/middleware.js')(app,['/profile','/questions']);
	require('../api/routes/index.server.routes.js')(app);
	require('../api/routes/users.server.routes.js')(app);
	require('../api/routes/question.server.routes.js')(app);

	app.use(express.static('./public'));

	return app;
};
