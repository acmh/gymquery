(function() {
    'use strict';

    angular
        .module("gymqueryApp")
        .controller("questionListController", questionListCtrl);

    questionListCtrl.$inject = ["questionService"];

    function questionListCtrl (questionService) {

    };
})();
