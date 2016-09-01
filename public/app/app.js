(function() {
    angular.module("gymqueryApp", ["ngRoute"]);

    angular
        .module("gymqueryApp")
        .run(["$rootScope", "$location", "authService", function($rootScope, $location, authService) {
            authService.checkLogin();

            $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
                if ((nextRoute.access && nextRoute.access.requiredLogin) && !authService.getLogged()) {
                    event.preventDefault();
                    $location.path("/");
                }
            });

            $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
                $rootScope.user = authService.getUser();
                // if the user is already logged in, take him to the home page
                if (authService.getLogged() && $location.path() == '/login') {
                    $location.path('/');
                }
            });
        }]);
})();
