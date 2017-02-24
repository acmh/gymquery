(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("newQuestionController", newQuestionCtrl);

    newQuestionCtrl.$inject = ["questionService", "$location"];

    function newQuestionCtrl (questionService, $location) {
        let vm = this;

        /* Models */
        vm.tasks = [{}];
        vm.active = 0;

        let activate = () => {
            vm.form = {
                title: "",
                creation: "",
                population: "",
                background: "",
                tags: "",
            };
        };

        ////////////////////////////////

        activate();

        vm.submitQuestion = (questionForm) => {
            if (!questionForm.$valid) { return; }

            questionService.submitQuestion(vm.form, vm.tasks).then(
                (res) => {
                    $location.url("/question/" + res.data.questionId);
                }
            );

            //TODO: error callback
        };

        vm.addTask = () => {
            vm.tasks.push({});
        };

        vm.removeTask = () => {
            vm.tasks.splice(vm.active, 1);
        };

        vm.selectTab = (index) => {
            vm.active = index;
        };

    };
})();
