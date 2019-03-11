(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.Create = Create;
        service.Delete = Delete;

        return service;        

        function GetAll() {
            return $http.get('/api/question/all').then(handleSuccess, handleError);
        }

        function Create(question) {
            return $http.post('/api/question/register', question).then(handleSuccess, handleError);
        }

        function Delete(question) {
            return $http.delete('/api/question/delete/' + question.question).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
