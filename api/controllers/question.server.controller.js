var Question = require('mongoose').model('Question');


exports.createQuestion = function(req, res, next) {
    console.log(req.body);
    var question = new Question({
        title: req.body.title,
        creationScript: req.body.creation,
        populateScript: req.body.populate,
        questionList: req.body.questions
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
