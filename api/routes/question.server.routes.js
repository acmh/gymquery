var question = require('../../api/controllers/question.server.controller');



module.exports = function(app){

    app.route('/questions').post(question.createQuestion);

    app.route('/questionsPaginated').get(question.questionsPaginated);

    app.route('/questions/:id').get(question.question);

};
