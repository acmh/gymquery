(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionController", questionCtrl);

    questionCtrl.$inject = ["questionService", "$routeParams", "$uibModal"];

    function questionCtrl (questionService, $routeParams, $uibModal) {
        var vm = this;

        /* Models */
        vm.question = {};
        vm.error = false;
        vm.selected = 0;
        vm.answerEditor = "";

        /* Button Handlers */
        vm.selectQuestion = selectQuestion;
        vm.openSubmitModal = openSubmitModal;

        /* Activating controller */
        activate();

        ////////////////////////////////

        function activate() {
            questionService.getQuestion($routeParams.qid).then(
                foundQuestion,
                notFoundQuestion
            );
        };

        function foundQuestion(res) {
            vm.question = res.data.question;
        };

        function notFoundQuestion(res) {
            //TODO fazer
        };

        function selectQuestion(index) {
            vm.selected = index;
            vm.answerEditor = "";
        };

        function openSubmitModal() {
            let modal = $uibModal.open({
                controller: 'modalSubmitController',
                controllerAs: 'modalCtrl',
                templateUrl: 'app/Question/modalSubmitAnswer.html',
                resolve: {
                    answer: () => {return vm.answerEditor;} ,
                    task: () => {return vm.question.taskList[vm.selected].task;}
                }
            });

            modal.result.then(
                () => {
                    console.log("Enviar");
                },
                () => {
                }
            );
        }
    };

    /* Controller da modal */

    angular
        .module('gymqueryApp')
        .controller('modalSubmitController', modalCtrl);

    modalCtrl.inject = ["$uibModalInstance"];

    function modalCtrl ($uibModalInstance, answer, task) {
        var vm = this;
        vm.answer = answer;
        vm.task = task;

        vm.ok = () => $uibModalInstance.close();
        vm.cancel = () => $uibModalInstance.dismiss();
        vm.readOnly = (_editor) => _editor.setReadOnly(true);
    };
})();
