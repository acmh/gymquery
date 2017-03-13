var question = require('../../api/controllers/question.server.controller');

var authorization = require('../../api/middleware/authorization');

module.exports = function(app){

    app.route('/questions').post([authorization.allowMonitor],question.createQuestion);

    app.route('/questionsPaginated').get(question.questionsPaginated);

    var mArray = [question.getQuestionById];

    app.route('/question/:id').get(mArray,question.question).post(question.answer);

};
