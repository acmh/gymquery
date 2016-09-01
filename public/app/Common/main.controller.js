(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("mainController", mainCtrl);

    mainCtrl.$inject = ["authService"];

    function mainCtrl (authService) {
        var vm = this;

        /* Click Handlers */
        vm.logout = logout;

        function logout() {
            authService.logout();
        }
    };
})();
