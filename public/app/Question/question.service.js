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
            getTasks: getTasks,
            addTask : addTask,
            removeTask : removeTask,
			submitQuestion : submitQuestion
        };

        return service;

		//////////////////////////////

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
		}
	};
})();
