var question = require('../../api/controllers/question.server.controller');



module.exports = function(app){

    app.route('/questions').post(question.createQuestion);

    app.route('/questionsPaginated').get(question.questionsPaginated);

    var mArray = [question.getQuestionById];


    app.route('/question/:id').get(mArray,question.question).post(question.answer);

};
