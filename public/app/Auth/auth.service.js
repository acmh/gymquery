(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("authService", authServ);

	authServ.$inject = ["$http"];

	function authServ ($http) {
        var auth;

        auth = {
            login: login,
			register: register
        };

        return auth;

        //////////////////////////////

        function login(user) {
			$http({
				method: "POST",
				url: "login",
				data: user
			}).then(function(response) {
				return 0;
			}, function(response) {
				return 1;
			});
        };

        function register(user) {
			$http({
				method: "POST",
				url: "register",
				data: user
			}).then(function(response) {
				return 0;
			}, function(response) {
				return 1;
			});
        }
	};
})();
