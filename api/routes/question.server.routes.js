var question = require('../../api/controllers/question.server.controller'),
    passport = require('passport');



module.exports = function(app){

    app.route('/questions').get(question.renderQuestions);
    app.route('/questions').post(question.createQuestion);

    app.route('/getQuestionsPaginated').get(question.getQuestionsPaginated);

};
