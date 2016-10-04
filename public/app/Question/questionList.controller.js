(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionListController", questionListCtrl);

    questionListCtrl.$inject = ["questionService"];

    function questionListCtrl (questionService) {
        var vm = this;
        var search = {
            author: "",
            title: "",
            tags: "",
        };

        /* Models */
        vm.searchInput = {
            author: "",
            title: "",
            tags: "",
        };
        vm.questions = [];
        vm.pageInfo = {};
        vm.enableGetMoreButton = true;

        /* Click Handlers */
        vm.getMoreQuestions = getMoreQuestions;

        /* Activating controller */
        activate();

        ////////////////////////////////

        function activate() {
            questionService.getQuestionList(search, 1).then(
                function(res) {
                    vm.questions = res.data.questions.docs;
                    vm.pageInfo.total = res.data.questions.total;
                    vm.pageInfo.page = parseInt(res.data.questions.page);
                    vm.pageInfo.pages = res.data.questions.pages;
                }
                //TODO error callback
            );
        };

        function getMoreQuestions() {
            vm.enableGetMoreButton = false;

            questionService.getQuestionList(search, vm.pageInfo.page+1).then(
                function(res) {
                    vm.questions = vm.questions.concat(res.data.questions.docs);
                    vm.pageInfo.total = res.data.questions.total;
                    vm.pageInfo.page = parseInt(res.data.questions.page);
                    vm.pageInfo.pages = res.data.questions.pages;

                    vm.enableGetMoreButton = true;
                }
                //TODO error callback
            );
        };
    };
})();
