(function() {
    'use strict';
    angular
      .module("gymqueryApp")
      .controller("indexController", indexCtrl);

      indexCtrl.$inject = ["$http"];

      function indexCtrl ($http){
        var vm = this;
        vm.toprated = [];

        activate();

        function activate(){
          $http.get('/topratedstudent')
          .then(function(response){
              vm.toprated = response.data.data;
              console.log(vm.toprated);
          }, function(response){
              //error
          });

          $http.get('/topratedcontributors')
          .then(function(response){
              vm.topratedcontributors = response.data.data;
          }, function(response){
              //error
          });


        }



      }
})();
