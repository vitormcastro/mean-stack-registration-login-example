(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.controller', Controller);

    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.question = null;
        vm.allQuestion = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.getAll = getAll;

        

        function saveQuestion() {
            
            QuestionService.Create(vm.question)
                .then(function () {
                    FlashService.Success('Question Created');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteQuestion() {
            QuestionService.Delete(vm.question)
                .then(function () {
                   FlashService.Success('Question Deleted');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getAll(){
            QuestionService.GetAll()
                .then(function(questions){
                    vm.allQuestion = questions.questions;
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();