var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	//mongoose.Promise = global.Promise;
	mongoose.Promise = require('bluebird');
	var db = mongoose.connect(config.db);

	require('../api/models/user.server.model');
	require('../api/models/question.server.model');
	require('../api/models/postgres.server.model').init;

	return db;
};
