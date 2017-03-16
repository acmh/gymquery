var question = require('../../api/controllers/question.server.controller');

module.exports = function(app){

    app.route('/questao/criar').post(question.createQuestion);

    app.route('/questao/listar').get(question.questionsPaginated);

    var mArray = [question.getQuestionById];

    app.route('/questao/:id').get(mArray,question.question).post(question.answer);

};
