(function() {
    'use strict';
    angular
        .module("gymqueryApp")
        .controller("indexController", indexCtrl);

    indexCtrl.$inject = ["$http"];

    function indexCtrl($http) {
        var vm = this;
        vm.toprated = [];

        activate();

        function activate() {
            $http.get('/usuario/estudante/rank')
                .then(function(response) {
                    vm.toprated = response.data.data;
                }, function(response) {
                    //error
                });

            $http.get('/usuario/contribuidores/rank')
                .then(function(response) {
                    vm.topratedcontributors = response.data.data;
                }, function(response) {
                    //error
                });
        }
    }
})();
