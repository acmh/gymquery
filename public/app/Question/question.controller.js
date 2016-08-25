(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionController", questionCtrl);

    questionCtrl.$inject = ["questionService"];

    function questionCtrl (questionService) {
        var vm = this;

        /* Models */
        vm.questions = questionService.getQuestions();

        /* Click Handlers */
        vm.addQuestion = questionService.addQuestion;
        vm.removeQuestion = questionService.removeQuestion;
        vm.submitQuestion = submitQuestion;

        ////////////////////////////////

        function submitQuestion() {
            questionService.submitQuestion(vm.title, vm.creation, vm.population);
            /*
            vm.title = '';
            vm.creation = '';
            vm.population = '';
            */
        };
    };
})();
