(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("mainController", mainCtrl);

    mainCtrl.$inject = ['mainService'];

    function mainCtrl (mainService) {
        var vm = this;

        /* Models */
        vm.questions = mainService.getQuestions();

        /* Click Handlers */
        vm.addQuestion = mainService.addQuestion;
        vm.removeQuestion = mainService.removeQuestion;
    };
})();
