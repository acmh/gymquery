(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("questionService", questionServ);

	questionServ.$inject = ["$http"];

	function questionServ ($http) {
        var service;
        var questions = [{}];

        service = {
            getQuestions: getQuestions,
            addQuestion : addQuestion,
            removeQuestion : removeQuestion,
			submitQuestion : submitQuestion
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

		function submitQuestion(title,creation,populate) {
			$http({
				method: "POST",
				url: "questions",
				data: {
					title: title,
					creationScript: creation,
					populateScript: populate,
					questionList: questions
				}
			});
		}
	};
})();
