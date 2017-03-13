var users = require('../../api/controllers/users.server.controller'),
	passport = require('passport');
var jwt = require('jsonwebtoken');
var maybePass = require('../../api/middleware/permissions').maybePass;



module.exports = function(app) {

	app.route('/register')
		.post(maybePass,users.register);

	app.route('/login')
		.post(users.login);

	app.route('/topratedstudent')
		.get(users.topten);

	app.route('/topratedcontributors')
		.get(users.toptencontributors);

	app.route('/userspaginated')
		.get(users.usersPaginated);

	app.route('/users/:id')
		.get(users.usersById);
};
