var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerQuestion);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (response) {
            if (response) {
                // authentication successful
                res.send({ userId: response.userId, token: response.token });
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerQuestion(req, res) {
    questionService.create(req)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.session.userId)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {
    var userId = req.session.userId;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.session.userId;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}