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
        vm.errorMsg = "";

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

        vm.submitQuestion = () => {
            let tags = [];
            for (let tag of vm.form.tags) {
                tags.push(tag.text);
            }

            questionService.submitQuestion(vm.form, vm.tasks).then(
                (res) => {
                    $location.url("/question/" + res.data.questionId);
                }
            );

            //TODO: error callback
        };

        vm.closeAlert = () => vm.errorMsg = "";

        vm.openNewTaskModal = () => {
            let modal = $uibModal.open({
                controller: 'modalNewTaskController',
                controllerAs: 'modalCtrl',
                templateUrl: 'app/Question/modalNewTask.html',
            });

            modal.result.then(
                (pair) => {
                    let newPair = {
                        task: pair.task,
                        answer: pair.answer
                    }

                    vm.tasks.push(newPair);
                },
                () => {}
            );
        };

        vm.openNewQuestionModal = (questionForm) => {
            if (!questionForm.$valid) { return; }
            if (vm.tasks.length == 0) {
                vm.errorMsg = "Adicione pelo menos uma pergunta para esta questão!";
                return;
            }
            if (vm.form.creation == "" || vm.form.population == "") {
                vm.errorMsg = "Escreva os scripts de criação/população para essa questão!!";
                return;
            }

            let modal = $uibModal.open({
                controller: 'modalNewQuestionController',
                controllerAs: 'modalCtrl',
                templateUrl: 'app/Question/modalNewQuestion.html',
                size: 'lg',
                resolve: {
                    form : () => {return vm.form},
                    tasks : () => {return vm.tasks}
                }
            });

            modal.result.then(
                () => vm.submitQuestion(),
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

    /* CONTROLE DAS MODAIS */

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

    /* Controller da modal de finalizar cadastro de questão */
    angular
        .module('gymqueryApp')
        .controller('modalNewQuestionController', modalNewQuestionCtrl);

    modalNewQuestionCtrl.inject = ["$uibModalInstance"];

    function modalNewQuestionCtrl ($uibModalInstance, form, tasks) {
        var vm = this;
        vm.form = form;
        vm.tasks = tasks;

        vm.ok = () => $uibModalInstance.close();
        vm.cancel = () => $uibModalInstance.dismiss();
        vm.readOnly = (_editor) => _editor.setReadOnly(true);
    };
})();
