(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("userService", userServ);

	userServ.$inject = ["$http"];

	function userServ ($http) {
		var service;

		service = {
			getUserList: getUserList,
			getUser: getUser
		};

		return service;

		function getUserList(search, page) {
			return $http({
				method: "GET",
				url: "/usuario/listar",
				params: {
					name: search.name,
					page: page
				}
			});
		};

		function getUser(uid) {
			return $http({
				method: "GET",
				url: "/usuario/" + uid
			});
		}
	};
})();
