var Question = require('mongoose').model('Question');


exports.createQuestion = function(req, res, next) {

    var question = new Question({
        title: req.body.title,
        creationScript: req.body.creation,
        populateScript: req.body.populate,
        taskList: req.body.taskList,
        tags: req.body.tags,
        author: req.body.author,
        background: req.body.background
    });

    question.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json("Question was created");
        }
    });
};

exports.renderQuestions = function(req, res, next) {

    if (!req.user) {


    } else {
        res.render('question', {
            user: req.user ? req.user.username : "",
            title: "Create Questions", //page title
            action: "/question", //post action for the form
            fields: [{
                    name: "Title",
                    type: 'text',
                    property: "required"
                }, //first field for the form
                {
                    name: "Creation Scripts",
                    type: "text",
                    property: "required"
                }, //another field for the form
                {
                    name: "Populate Scripts",
                    type: "text",
                    property: "required"
                }
            ],
            buttonName: "Submit"
        });
    }
};

exports.getQuestionsPaginated = function(req, res){

    var query = {};
    var options = {};

    options.page = req.query.page;
    options.limit = 10;
    options.select = "title background author";

    if(req.query.title){
        query.title = req.query.title;
    }

    if(req.query.sort){
        options.sort = {"date": req.query.sort};
    }

    if(req.query.author){
        query.author = req.query.author;
    }

    Question.paginate(query, options, function(err, result){
        if(err){
            res.status(500).json(err.message);
        }else{
            console.log(result);
            res.status(200).json({
                success:true,
                questions: result
            });
        }
    });

}
