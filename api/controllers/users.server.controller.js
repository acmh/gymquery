var User = require('mongoose').model('User'),
	jwt = require('jsonwebtoken');

exports.showprofile = function(req, res){
	console.log('Entrou');
	res	.json({
		'alo':'molieres'
	});
}

exports.login = function(req,res){
	var _email = req.body.email;

	User.findOne({email: _email}, function(err, user) {
		if(err){
			res.status(404).json(err);
			return;
		}

		//If there is no user with this email
		if(!user){
			res.status(401).json({
				success: false,
				message: 'Authentication failed. User not found.'
			});

		}else if(user){
			if(!user.validPassword(req.body.password)){
				res.status(401).json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			}else{
				var token = user.generateJwt();
				res.status(200);
				res.json({
				  	"token" : token,
			   		"username" : user.name
				});
			}
		}
	});
}

exports.register = function(req, res){
	var user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.setPassword(req.body.password);

	user.save(function(err) {
		if(err){
			console.log(err);
			if(err.code == "11000"){
				res.status(401);
				res.json({
					data: "User already exits"
				});
			}else{
				res.status(500);
				res.json({
					data: "Error ocurred: " + err
				});
			}
		}else{
			User.findOne({email: user.email}, function(err, user) {
				if(err){
					res.status(404).json(err);
					return;
				}

				//If there is no user with this email
				if(!user){
					res.status(401).json({
						success: false,
						message: 'Authentication failed. User not found.'
					});

				}else if(user){
					if(!user.validPassword(req.body.password)){
						res.status(401).json({
							success: false,
							message: 'Authentication failed. Wrong password.'
						});
					}else{
						token = user.generateJwt();
						res.status(200);
						res.json({
						  	"token" : token,
					   		"username" : user.name
						});
					}
				}
			});
		}
	});
}


/*var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('register', {
			title: 'Register Form',
			messages: req.flash('error')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.register = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
			}

			req.login(user, function(err) {
				if (err)
					return next(err);

				return res.redirect('/');
			});
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
			_id: id
		},
		function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(req.user);
		}
	})
};*/
