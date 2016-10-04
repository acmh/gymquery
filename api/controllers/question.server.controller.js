var Question = require('mongoose').model('Question');

exports.createQuestion = function(req, res, next) {

    var question = new Question(req.body);

    question.save(function(err, addedQuestion) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json({
                success:true,
                questionId: addedQuestion._id
            });
        }
    });
};

exports.questionsPaginated = function(req, res){

    var query = {};
    var options = {};

    options.page = req.query.page;
    options.limit = 10;
    options.select = "title tags author";

    if(req.query.title){
        query.title = req.query.title;
    }

    if(req.query.sort){
        options.sort = {"date": req.query.sort};
    }

    if(req.query.author){
        query.author = req.query.author;
    }

    if(req.query.tags){
        //If only one tag, put into an array: $in only accepts arrays
        if(req.query.tags.constructor !== Array){
            req.query.tags = [req.query.tags];
        }
        query.tags = { "$in": req.query.tags};
    }


    Question.paginate(query, options, function(err, result){
        if(err){
            res.status(500).json({
                message: err.message
            });
        }else{
            console.log(result);
            res.status(200).json({
                success:true,
                questions: result
            });
        }
    });

}

exports.question = function(req,res){
    var _id = req.params.id;
    Question.findOne({_id: _id}, function(err, question){
        if(err){
            res.status(400).json({
                message: err.message
            });
        }else{
            res.status(200).json({
                success: true,
                question: question
            });
        }
    });
}
