var users = require('../../api/controllers/users.server.controller'),
	passport = require('passport');
var jwt = require('jsonwebtoken');



module.exports = function(app) {

	//Generic middleware for protected routes
	app.use('/profile', function(req, res, next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		// decode token
		if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token,'MY_SECRET', function(err, decoded) {
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	        next();
	      }
	    });
	  } else {
		  // if there is no token
		  // return an error
		  return res.status(403).send({
		  	success: false,
		    message: 'No token provided.'
		  });
	  }
	});

	app.route('/profile')
		.get(users.showprofile);

	app.route('/register')
		.post(users.register);

	app.route('/login')
		.post(users.login);



};
