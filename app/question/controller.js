(function () {
    'use strict';

    angular
        .module('app')
        .controller('question.controller', Controller);

    function Controller($window, QuestionService, FlashService) {
        var vm = this;

        vm.question = null;
        vm.saveQuestion = saveQuestion;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            QuestionService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveQuestion() {
            QuestionService.Update(vm.question)
                .then(function () {
                    FlashService.Success('User updated');
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