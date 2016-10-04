(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionListController", questionListCtrl);

    questionListCtrl.$inject = ["questionService"];

    function questionListCtrl (questionService) {
        var vm = this;
        var searchParam = {
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
        vm.search = search;

        /* Activating controller */
        activate();

        ////////////////////////////////

        function activate() {
            questionService.getQuestionList(searchParam, 1).then(
                function(res) {
                    vm.questions = res.data.questions.docs;
                    vm.pageInfo.total = res.data.questions.total;
                    vm.pageInfo.page = parseInt(res.data.questions.page);
                }
                //TODO error callback
            );
        };

        function getMoreQuestions() {
            vm.enableGetMoreButton = false;

            questionService.getQuestionList(searchParam, vm.pageInfo.page+1).then(
                function(res) {
                    vm.questions = vm.questions.concat(res.data.questions.docs);
                    vm.pageInfo.total = res.data.questions.total;
                    vm.pageInfo.page = parseInt(res.data.questions.page);

                    vm.enableGetMoreButton = true;
                }
                //TODO error callback
            );
        };

        function search() {
            searchParam.author = vm.searchInput.author;
            searchParam.title = vm.searchInput.title;
            searchParam.tags = vm.searchInput.tags;

            questionService.getQuestionList(searchParam, 1).then(
                function(res) {
                    vm.questions = res.data.questions.docs;
                    vm.pageInfo.total = res.data.questions.total;
                    vm.pageInfo.page = parseInt(res.data.questions.page);
                }
                //TODO error callback
            );
        };
    };
})();
