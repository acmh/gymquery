exports.render = function(req, res) {
    res.render('index', {
    	title: 'Gym Query',
    	user: req.user ? req.user.username : ''
    });
};
