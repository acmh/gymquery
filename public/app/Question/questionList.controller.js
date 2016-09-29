(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionListController", questionListCtrl);

    questionListCtrl.$inject = ["questionService"];

    function questionListCtrl (questionService) {
        var vm = this;

        /* Models */
        vm.search = {
            author: "",
            title: "",
            tags: "",
        };
        vm.questions = [];

        /* Activating controller */
        activate();

        ////////////////////////////////

        function activate() {
            questionService.getQuestionList(vm.search, 1).then(
                function(res) {
                    vm.questions = res.data.questions.docs;
                }
            );
        };
    };
})();
