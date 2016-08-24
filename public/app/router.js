(function() {
	'use strict';

    angular
        .module("gymqueryApp")
        .config(route);

    function route ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/_mainView.html',
                controller: 'mainController',
                controllerAs: 'main'
            });

        $locationProvider.html5Mode(true);
    };
})();
