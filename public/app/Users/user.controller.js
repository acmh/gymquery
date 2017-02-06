(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("userController", userCtrl);

    userCtrl.$inject = ["userService", "$routeParams"];

    function userCtrl (userService, $routeParams) {
        let vm = this;

        /* Models */
        vm.user = null;

        activate();

        ////////////////////////////

        function activate() {
            userService.getUser($routeParams.uid).then(
                foundUser,
                notFoundUser
            )
        };

        function foundUser(res) {
            vm.user = res.data.data;
        };

        function notFoundUser() {
            //TODO funcao
        }
    };
})();
