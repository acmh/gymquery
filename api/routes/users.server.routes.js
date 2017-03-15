var users = require('../../api/controllers/users.server.controller'),
	passport = require('passport');
var jwt = require('jsonwebtoken');
var maybePass = require('../../api/middleware/permissions').maybePass;



module.exports = function(app) {

	app.route('/usuario/registrar')
		.post(maybePass,users.register);

	app.route('/usuario/login')
		.post(users.login);

	app.route('/usuario/estudante/rank')
		.get(users.topten);

	app.route('/usuario/contribuidores/rank')
		.get(users.toptencontributors);

	app.route('/usuario/listar')
		.get(users.usersPaginated);

	app.route('/usuario/:id')
		.get(users.usersById);
};
