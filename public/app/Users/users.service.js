(function() {
	'use strict';

	angular
        .module("gymqueryApp")
		.factory("userService", userServ);

	userServ.$inject = [];

	function userServ () {
		var service;

		service = {
			getUserList: getUserList
		};

		return service;

		function getUserList(search, page) {
			return $http({
				method: "GET",
				url: "/usersPaginated",
				params: {
					name: search.name,
					page: page
				}
			});
		};
	};
})();
