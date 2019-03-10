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
        vm.deleteUser = deleteUser;
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

        function deleteUser() {
            QuestionService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function getAll(){
            QuestionService.GetAll()
                .then(function(questions){
                    vm.allQuestion = JSON.stringify(questions);
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();