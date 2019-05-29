var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.getQuestion = getQuestion;
service.create = create;
service.delete = _delete;
service.getAllQuestion = getAll;

module.exports = service;


function create(questionParam) {
    var deferred = Q.defer();  

    createUser();

    function createUser() {
        // set user object to userParam without the cleartext password
        var question = questionParam.body;

        db.questions.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
    
                deferred.resolve();
            });
    }
    
    

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function  getAll(){
    var deferred = Q.defer();

    db.questions.find({}).toArray(function(err,questions){
        console.log(questions);
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (questions) {
            var questionArray = "{\"questions\": [ ";
            var i = 0;
            while(i < questions.length){
                if(i>0) questionArray = questionArray + ", ";
                questionArray = questionArray+"\""+questions[i].question+"\"";
                i = i+1;
            }
           
               
            
            questionArray = questionArray+"]}";

            deferred.resolve(questionArray);
        } else {
     
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getQuestion(questionParam){
    var deferred = Q.defer();
    db.questions.findOne({ question: questionParam.params._question },function (err, question) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (question) {
            deferred.resolve(question._id);
        }else{
            deferred.resolve();
        }
    });
    return deferred.promise;
}