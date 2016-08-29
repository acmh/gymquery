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
            })
			.when('/login', {
				templateUrl: 'app/Login/_login.html',
				controller: 'loginController',
				controllerAs: 'auth'
			});

        $locationProvider.html5Mode(false);
    };
})();
