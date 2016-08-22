var question = require('../../app/controllers/question.server.controller'),
    passport = require('passport');



module.exports = function(app){

    app.route('/questions').get(question.renderQuestions);

};
