var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.post('/register', registerQuestion);
router.get('/all', getAllQuestion);
router.delete('/delete/:_question', deleteQuestion);

module.exports = router;



function registerQuestion(req, res) {
    questionService.create(req)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllQuestion(req, res) {
    questionService.getAllQuestion()
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteQuestion(req, res) {
    questionService.getQuestion(req).then(function(questionID){
        if (questionID) {
            questionService.delete(questionID) .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
        }
        else{
            res.status(400).send("Codigo Inexistente");
        }
    });
    
       
        
    }

   
