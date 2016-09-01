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
        vm.errorLogin = errorLogin;
        vm.errorRegister = errorRegister;

        activate();

        ////////////////////////////////

        function activate() {
            vm.error = false;
        }

        function submitLogin(loginForm) {
            if (!loginForm.$valid) { return; }

            authService.login(vm.login).then(
                authService.successLogin,
                vm.errorLogin
            );
        };

        function submitRegister(registerForm) {
            if (!registerForm.$valid) { return; }

            authService.register(vm.register).then(
                authService.successLogin,
                vm.errorRegister
            );
        };

        function errorLogin(response) {
            vm.error = "Erro! Email/Senha errados!";
            $timeout(3000).then(function() {
                vm.error = false;
            });
        };

        function errorRegister(response) {
            vm.error = "Erro! Email/Nome já utilizados!";
            $timeout(3000).then(function() {
                vm.error = false;
            });
        };

    };
})();
