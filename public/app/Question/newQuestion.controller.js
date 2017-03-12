(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("newQuestionController", newQuestionCtrl);

    newQuestionCtrl.$inject = ["questionService", "$location", "$uibModal"];

    function newQuestionCtrl (questionService, $location, $uibModal) {
        let vm = this;

        /* Models */
        vm.tasks = [];

        vm.newTaskModel = {
            task: "",
            answer: ""
        }

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

        vm.openNewTaskModal = () => {
            let modal = $uibModal.open({
                controller: 'modalNewTaskController',
                controllerAs: 'modalCtrl',
                templateUrl: 'app/Question/modalNewTask.html',
            });

            modal.result.then(
                (pair) => {
                    console.log(pair);
                    let newPair = {
                        task: pair.task,
                        answer: pair.answer
                    }

                    vm.tasks.push(newPair);
                },
                () => {}
            );
        };

        vm.removeTask = (index) => {
            vm.tasks.splice(index, 1);
        };

        vm.readOnly = (_editor) => {
            _editor.setReadOnly(true);
        };

    };

    /* Controller da modal de nova questão */
    angular
        .module('gymqueryApp')
        .controller('modalNewTaskController', modalCtrl);

    modalCtrl.inject = ["$uibModalInstance"];

    function modalCtrl ($uibModalInstance) {
        var vm = this;
        vm.pair = {
            task: "",
            answer:""
        }
        vm.error = false;

        vm.ok = () => {
            if (vm.pair.task != "" && vm.pair.answer != "") {
                $uibModalInstance.close(vm.pair);
            } else {
                vm.error = true;
            }
        }
        vm.cancel = () => $uibModalInstance.dismiss();
        vm.closeAlert = () => vm.error = false;
    };
})();
