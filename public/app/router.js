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
			.when('/newQuestion', {
				templateUrl: 'app/Question/_newQuestion.html',
				controller: 'newQuestionController',
				controllerAs: 'question',
				access: {
					requiredLogin : true
				}
			})
			.when('/questions', {
				templateUrl: 'app/Question/_questionList.html',
				controller: 'questionListController',
				controllerAs: 'question',
				access: {
					requiredLogin : true
				}
			})
			.when('/submissions', {
				templateUrl: 'app/Submission/_submission.html',
				controller: 'submissionController',
				controllerAs: 'submission',
				access: {
					requiredLogin : true
				}
			})
			.when('/users', {
				templateUrl: 'app/Users/_users.html',
				controller: 'userController',
				controllerAs: 'user',
				access: {
					requiredLogin : true
				}
			});

        $locationProvider.html5Mode(false);
    };
})();
