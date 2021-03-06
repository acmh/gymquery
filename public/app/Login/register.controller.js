(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("registerController", registerCtrl);

    registerCtrl.$inject = ["authService", "$timeout"];

    function registerCtrl (authService, $timeout) {
        var vm = this;

        /* Click Handlers */

        vm.submitRegister = submitRegister;
        vm.errorRegister = errorRegister;

        activate();

        ////////////////////////////////

        function activate() {
            vm.error = false;
        }

        function submitRegister(registerForm) {
            if (vm.register.password !== vm.register.retypepassword) {
                vm.error="Erro! Senhas diferentes!"
                $timeout(3000).then(function() {
                    vm.error = false;
                });
            }

            if (!registerForm.$valid) { return; }

            authService.register(vm.register).then(
                authService.successRegister,
                vm.errorRegister
            );

        };

        function errorRegister(response) {
            vm.error = "Erro! Email/Nome já utilizados!";
            $timeout(3000).then(function() {
                vm.error = false;
            });
        };

    };
})();
