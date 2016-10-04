(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("newQuestionController", newQuestionCtrl);

    newQuestionCtrl.$inject = ["questionService", "$location"];

    function newQuestionCtrl (questionService, $location) {
        var vm = this;

        /* Models */
        vm.tasks = questionService.getTasks();

        /* Click Handlers */
        vm.addTask = questionService.addTask;
        vm.removeTask = questionService.removeTask;
        vm.submitQuestion = submitQuestion;

        activate();

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

            questionService.submitQuestion(vm.form).then(
                submitSuccess
            );

            //TODO: error callback
        };

        function submitSuccess(res) {
            $location.url("/question/" + res.data.questionId);
        };
    };
})();
