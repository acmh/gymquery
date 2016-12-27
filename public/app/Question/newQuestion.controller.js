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
        vm.active = 1;

        /* Click Handlers */
        vm.addTask = questionService.addTask;
        vm.removeTask = removeTask;
        vm.submitQuestion = submitQuestion;

        /* Controller methods */
        vm.setActiveTab = setActiveTab;

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

        function setActiveTab(tab) {
            vm.active = tab;
        };

        function removeTask(index) {
            questionService.removeTask(index);

            if (vm.active > questionService.getTasks().length) {
                vm.active = questionService.getTasks().length;
            }
        };
    };
})();
