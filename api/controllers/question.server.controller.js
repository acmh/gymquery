var Question = require('mongoose').model('Question'),
	passport = require('passport');


exports.create = function(req,res,next){
    var question = new Question(req.body);

		question.save(function(err){
      if(err){
        return next(err);
      }else{
        res.json(question);
      }
    });
};

exports.renderQuestions = function(req, res, next){

		if(!req.user){


		}else{
			res.render('question', {
					user:		req.user ? req.user.username : "",
					title:	"Create Questions", //page title
					action: "/question", //post action for the form
					fields: [
						{name: "Title", type:'text', property:"required"},   //first field for the form
						{name: "Creation Scripts",type:"text",property:"required"},   //another field for the form
						{name: "Populate Scripts", type: "text", property: "required"}
					],
					buttonName: "Submit"
			});
		}
};
