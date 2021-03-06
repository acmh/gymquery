(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("questionService", questionServ);

	questionServ.$inject = ["$http", "authService"];

	function questionServ ($http, authService) {
        var service;

        service = {
			// Add Question Functions
			submitQuestion : submitQuestion,

			// Question List Functions
			getQuestionList: getQuestionList,

			// Question Functions
			getQuestion: getQuestion
        };

        return service;

		/////////////////////////////
		// Add Question Functions  //
		/////////////////////////////

		function submitQuestion(form, tasks, tags) {
			return $http({
				method: "POST",
				url: "/questao/criar",
				data: {
					title: form.title,
					creationScript: form.creation,
					populateScript: form.population,
					background: form.background,
					tags: tags,
					author: authService.getUser(),
					taskList: tasks
				}
			});
		};

		//////////////////////////////
		// Question List Functions  //
		//////////////////////////////

		function getQuestionList(search, page) {
			return $http({
				method: "GET",
				url: "/questao/listar",
				params: {
					author: search.author,
					title: search.title,
					tags: search.tags.split(" ").filter(((v, i, a) => a.indexOf(v) === i)),
					page: page
				}
			});
		};

		//////////////////////////////
		//// Question  Functions  ////
		//////////////////////////////

		function getQuestion(qid) {
			return $http({
				method: "GET",
				url: "/questao/" + qid
			});
		};
	};
})();
