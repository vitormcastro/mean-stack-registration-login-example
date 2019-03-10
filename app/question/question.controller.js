(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.controller', Controller);

    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.question = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteUser = deleteUser;

        

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
    }

})();