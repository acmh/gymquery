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

		function submitQuestion(form, tasks) {
			return $http({
				method: "POST",
				url: "/questions",
				data: {
					title: form.title,
					creationScript: form.creation,
					populateScript: form.population,
					background: form.background,
					tags: form.tags,
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
				url: "/questionsPaginated",
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
				url: "/question/" + qid
			});
		};
	};
})();
