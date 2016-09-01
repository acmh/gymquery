(function() {
	'use strict';

    angular
        .module("gymqueryApp")
        .config(route);

    function route ($routeProvider, $locationProvider) {
        $routeProvider
			.when('/', {
				template: ' ',
				access: {
					requiredLogin : false
				}
			})
			.when('/login', {
				templateUrl: 'app/Login/_login.html',
				controller: 'loginController',
				controllerAs: 'auth',
				access: {
					requiredLogin : false
				}
			})
			.when('/questions', {
				templateUrl: 'app/Question/_question.html',
				controller: 'questionController',
				controllerAs: 'question',
				access: {
					requiredLogin : true
				}
			});

        $locationProvider.html5Mode(false);
    };
})();
