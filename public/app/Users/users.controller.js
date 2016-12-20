(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("userController", userCtrl);

    userCtrl.$inject = ["userService"];

    function userCtrl (userService) {
        var vm = this;

        /* Models */
        vm.enableGetMoreButton = true;
        vm.searchInput = "";
        vm.pageInfo = {};

        vm.users = [
            {
                name: "nome1asdsad",
                acc: 0,
                tried: 3
            },
            {
                name: "nome2",
                acc: 1,
                tried: 5
            },
            {
                name: "nome2",
                acc: 1,
                tried: 5
            },
            {
                name: "nome2",
                acc: 1,
                tried: 5
            },
            {
                name: "nome2",
                acc: 1,
                tried: 5
            },
            {
                name: "nome2",
                acc: 1,
                tried: 5
            },
            {
                name: "nome2",
                acc: 1,
                tried: 5
            },
            {
                name: "nome3",
                acc: 10,
                tried: 0
            }
        ];

        /* Click Handlers */
        vm.getMoreUsers = getMoreUsers;

        /* Functions */

        function getMoreUsers() {
            vm.enableGetMoreButton = false;

            searchParam.name = vm.searchInput;

            userService.getQuestionList(searchParam, vm.pageInfo.page+1).then(
                function(res) {
                    vm.users = vm.users.concat(res.data.users.docs);
                    vm.pageInfo.total = res.data.users.total;
                    vm.pageInfo.page = parseInt(res.data.users.page);

                    vm.enableGetMoreButton = true;
                }
                //TODO error callback
            );
        };
    };
})();
