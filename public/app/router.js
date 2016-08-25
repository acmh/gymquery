(function() {
	'use strict';

    angular
        .module("gymqueryApp")
        .config(route);

    function route ($routeProvider, $locationProvider) {
        $routeProvider
			.when('/', {
				template: ' '
			})
            .when('/questions', {
                templateUrl: 'app/Question/_question.html',
                controller: 'questionController',
                controllerAs: 'question'
            });

        $locationProvider.html5Mode(false);
    };
})();
