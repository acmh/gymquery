(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("usersController", userCtrl);

    userCtrl.$inject = ["userService"];

    function userCtrl (userService) {
        let searchParam;
        var vm = this;

        /* Models */
        vm.enableGetMoreButton = true;
        vm.searchInput = "";
        vm.pageInfo = {};

        /* Click Handlers */
        vm.getMoreUsers = getMoreUsers;
        vm.search = search;

        activate();

        ///////////////////////////////

        function activate() {
            search();
        };

        function getMoreUsers() {
            vm.enableGetMoreButton = false;

            userService.getUserList(searchParam, vm.pageInfo.page+1).then(
                function(res) {
                    vm.users = vm.users.concat(res.data.users.docs);
                    vm.pageInfo.total = res.data.users.total;
                    vm.pageInfo.page = parseInt(res.data.users.page);

                    vm.enableGetMoreButton = true;
                }
                //TODO error callback
            );
        };

        function search() {
            vm.enableGetMoreButton = false;

            searchParam = {};
            searchParam.name = vm.searchInput;

            userService.getUserList(searchParam, 1).then(
                function(res) {
                    vm.users = res.data.users.docs;
                    vm.pageInfo.total = res.data.users.total;
                    vm.pageInfo.page = parseInt(res.data.users.page);

                    vm.enableGetMoreButton = true;
                }
            );
        };
    };
})();
