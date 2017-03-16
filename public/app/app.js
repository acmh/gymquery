(function() {
    angular.module("gymqueryApp", ["ngRoute", "ngAnimate", "ngTagsInput", "ui.ace", "ui.bootstrap"]);

    angular
        .module("gymqueryApp")
        .run(["$rootScope", "$location", "authService", "$http", function($rootScope, $location, authService, $http) {
            //Update user and token values when refreshing
            authService.checkLogin();

            //Set auth token as a header for HTTP Requests
            $http.defaults.headers.common['x-access-token'] = authService.getToken();

            $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
                if ((nextRoute.access && nextRoute.access.requiredLogin) && !authService.getLogged()) {
                    event.preventDefault();
                    $location.path("/");
                }
            });

            $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
                $rootScope.user = authService.getUser();
                // if the user is already logged in, take him to the home page
                if (authService.getLogged() && ($location.path() == '/login' || $location.path() == '/registrar')) {
                    $location.path('/');
                }
            });
        }]);
})();
