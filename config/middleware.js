var jwt = require('jsonwebtoken');


module.exports = function(app, routes) {
  //Generic middleware for protected routes
  for(var i = 0; i < routes.length; i++){
    app.use(routes[i], function(req, res, next){
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
  }





}
