(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("authService", authServ);

	authServ.$inject = ["$http", "$window", "$location"];

	function authServ ($http, $window, $location) {
        var auth;
		var user;
		var token;
		var isLogged = false;

        auth = {
            login: login,
			register: register,
			logout: logout,
			checkLogin: checkLogin,
			successLogin: successLogin,
			getLogged: getLogged,
			getUser: getUser,
			getToken: getToken
        };

        return auth;

        //////////////////////////////

        function login(userParam) {
			return $http({
				method: "POST",
				url: "login",
				data: userParam
			});
        };

        function register(userParam) {
			return $http({
				method: "POST",
				url: "register",
				data: userParam
			});
        };

		function logout() {
			user = null;
			token = null;
			delete $window.sessionStorage.token;
    		delete $window.sessionStorage.user;
			isLogged = false;

			$location.path("/login");
		};

		function checkLogin() {
			if ($window.sessionStorage.token && $window.sessionStorage.user) {
				user = $window.sessionStorage.user;
				token = $window.sessionStorage.token;
				isLogged = true;
			} else {
				isLogged = false;
			}
		};

		function successLogin(res) {
			user = res.data.username;
			token = res.data.token;

			$window.sessionStorage.user = res.data.username;
			$window.sessionStorage.token = res.data.token;

			isLogged = true;

			$location.path("/");
		};

		function getUser() {
			return user;
		};

		function getLogged() {
			return isLogged;
		};

		function getToken() {
			return token;
		}

	};
})();
