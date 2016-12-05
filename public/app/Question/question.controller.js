(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionController", questionCtrl);

    questionCtrl.$inject = ["questionService", "$routeParams"];

    function questionCtrl (questionService, $routeParams) {
        var vm = this;

        /* Models */
        vm.question = {};
        vm.error = false;
        vm.selected = 0;

        /* Button Handlers */
        vm.selectQuestion = selectQuestion;

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
        };
    };
})();
