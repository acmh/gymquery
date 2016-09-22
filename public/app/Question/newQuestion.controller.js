(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("newQuestionController", newQuestionCtrl);

    newQuestionCtrl.$inject = ["questionService"];

    function newQuestionCtrl (questionService) {
        var vm = this;

        /* Models */
        vm.tasks = questionService.getTasks();

        /* Click Handlers */
        vm.addTask = questionService.addTask;
        vm.removeTask = questionService.removeTask;
        vm.submitQuestion = submitQuestion;

        activate()

        ////////////////////////////////

        function activate() {
            vm.form = {
                title: "",
                creation: "",
                population: "",
                background: "",
                tags: "",
            };
        };

        function submitQuestion(questionForm) {
            if (!questionForm.$valid) { return; }
            
            questionService.submitQuestion(vm.form);
            /*
            vm.title = '';
            vm.creation = '';
            vm.population = '';
            */
        };
    };
})();
