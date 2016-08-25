(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("questionService", questionServ);

	function questionServ () {
        var service;
        var questions = [{}];

        service = {
            getQuestions: getQuestions,
            addQuestion : addQuestion,
            removeQuestion : removeQuestion
        };

        return service;

        function getQuestions() {
            return questions;
        };

        function addQuestion() {
            questions.push({});
        };

        function removeQuestion() {
            questions.pop();
        };
	};
})();
