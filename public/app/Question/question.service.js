(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("questionService", questionServ);

	questionServ.$inject = ["$http", "authService"];

	function questionServ ($http, authService) {
        var service;
        var tasks = [{}];

        service = {
			// Add Question Functions
            getTasks: getTasks,
            addTask : addTask,
            removeTask : removeTask,
			submitQuestion : submitQuestion,

			// Question List Functions
			getQuestionList: getQuestionList
        };

        return service;

		/////////////////////////////
		// Add Question Functions  //
		/////////////////////////////

        function getTasks() {
            return tasks;
        };

        function addTask() {
            tasks.push({});
        };

        function removeTask() {
            tasks.pop();
        };

		function submitQuestion(form) {
			$http({
				method: "POST",
				url: "questions",
				data: {
					title: form.title,
					creationScript: form.creation,
					populateScript: form.populate,
					background: form.background,
					tags: form.tags.split(" ").filter(((v, i, a) => a.indexOf(v) === i)),
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
				url: "/getQuestionsPaginated",
				params: {
					author: search.author,
					title: search.title,
					tags: search.tags.split(" ").filter(((v, i, a) => a.indexOf(v) === i)),
					page: page
				}
			});
		};
	};
})();
