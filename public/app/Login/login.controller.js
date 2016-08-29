(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("loginController", loginCtrl);

    loginCtrl.$inject = ["authService", "$timeout"];

    function loginCtrl (authService, $timeout) {
        var vm = this;

        /* Click Handlers */
        vm.submitLogin = submitLogin;
        vm.submitRegister = submitRegister;

        activate();

        ////////////////////////////////

        function activate() {
            vm.error = false;
        }

        function submitLogin(loginForm) {
            if (!loginForm.$valid) { return; }

            if (authService.login(vm.login) != 0) {
                vm.error = "Erro! Email/Senha errados!";
                $timeout(5000).then(function() {
                    vm.error = false;
                });
            }
        };

        function submitRegister(registerForm) {
            if (!registerForm.$valid) { return; }

            authService.register(vm.register);
        };

    };
})();
