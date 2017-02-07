 	var User = require('mongoose').model('User'),
	jwt = require('jsonwebtoken');

exports = module.exports = {};

exports.login = function(req,res){
	var _email = req.body.email;
	User.findOne({email: _email}, "password salt name email role",  function(err, user) {
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
	console.log(req.body);
	user.setPassword(req.body.password);

	user.save(function(err) {
		if(err){
			console.log(err);
			if(err.code == "11000"){
				res.status(401);
				res.json({
					message: "User already exits"
				});
			}else{
				res.status(500);
				res.json({
					message: "Error ocurred: " + err
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

exports.topten = function(req, res){

	User
	.find({role: 1})
	.sort({"acc": -1})
	.limit(10)
	.exec(function(err, users){
			if(err){
				res.status(500).json({
					sucess: false,
					error: err.message
				})
			}else{
				var data = [];

				users.forEach(function(user){
					data.push({
						name: user.name,
						rating: user.acc
					})
				})

				res.status(200).json({
					success: true,
					data: data
				})
			}
	})
}

exports.toptencontributors = function(req, res){
	User
	.find({role: 0})
	.sort({"acc": -1})
	.limit(10)
	.exec(function(err, users){
			if(err){
				res.status(500).json({
					sucess: false,
					error: err.message
				})
			}else{
				var data = [];

				users.forEach(function(user){
					data.push({
						name: user.name,
						rating: user.acc
					})
				})

				res.status(200).json({
					success: true,
					data: data
				})
			}
	})
}

exports.usersPaginated = function(req, res){
	var query = {};
	var options = {};

	options.page = req.query.page;
	options.limit = 10;

	if(req.query.name){
			query.name = { "$regex": req.query.name, "$options": "i" };
	}

	if(req.query.sort){
			options.sort = {"name": req.query.sort};
	}

	User.paginate(query, options, function(err, result){
			if(err){
					res.status(500).json({
							message: err.message
					});
			}else{
					console.log(result);
					res.status(200).json({
							success:true,
							users: result
					});
			}
	});



}

exports.usersById = function(req, res){
	var user_id = req.params.id;

	User.findById(user_id, function(err, user){
		if(err){
			res.status(500).json({
				success: false,
				error: err.message
			})
		}else{
			res.status(200).json({
				success: true,
				data: user
			})
		}
	})
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
