(function() {
	'use strict';

    angular
        .module("gymqueryApp")
        .config(route);

    function route ($routeProvider, $locationProvider) {
        $routeProvider
			.when('/', {
				templateUrl: 'app/Home/_index.html',
				controller: 'indexController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : false
				}
			})
			.when('/login', {
				templateUrl: 'app/Login/_login.html',
				controller: 'loginController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : false
				}
			})
			.when('/registrar', {
				templateUrl: 'app/Login/_register.html',
				controller: 'registerController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : false
				}
			})
			.when('/questao/criar', {
				templateUrl: 'app/Question/_newQuestion.html',
				controller: 'newQuestionController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : true
				}
			})
			.when('/questao/listar', {
				templateUrl: 'app/Question/_questionList.html',
				controller: 'questionListController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : true
				}
			})
			.when('/questao/:qid', {
				templateUrl: 'app/Question/_question.html',
				controller: 'questionController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : true
				}
			})
			.when('/submissao', {
				templateUrl: 'app/Submission/_submission.html',
				controller: 'submissionController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : true
				}
			})
			.when('/usuario/listar', {
				templateUrl: 'app/Users/_users.html',
				controller: 'usersController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : true
				}
			})
			.when('/usuario/:uid', {
				templateUrl: 'app/Users/_user.html',
				controller: 'userController',
				controllerAs: 'ctrl',
				access: {
					requiredLogin : true
				}
			});

        $locationProvider.html5Mode(false);
    };
})();
