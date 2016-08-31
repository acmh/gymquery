var users = require('../../api/controllers/users.server.controller'),
	passport = require('passport');
var jwt = require('jsonwebtoken');



module.exports = function(app) {

	app.route('/profile')
		.get(users.showprofile);

	app.route('/register')
		.post(users.register);

	app.route('/login')
		.post(users.login);

};
