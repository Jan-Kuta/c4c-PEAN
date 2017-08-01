var express = require('express');
var passport = require('passport');
var request = require('request');
var router = express.Router();
var User = require('../models').User;

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

// create new user
router.post('/register', function (req, res, next) {
    console.log("Registering user: " + req.body.email);

    if (!req.body.username || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    var user = User.build({
        username: req.body.username,
        email: req.body.email
    });
    user.setPassword(req.body.password);
    user.save().then(usr => {
            console.log('User saved ', usr.dataValues);
            var token;
            token = user.generateJwt();
            sendJSONresponse(
                res,
                200, {
                    "message": "User registered: " + req.body.email,
                    "token": token
                }
            );
        })
        .catch(err => {
            console.log('ERROR: ', err.message);
            sendJSONresponse(res, 400, {"message": err.message});
        });
});

// login user - local
router.post('/login', function (req, res, next) {
    console.log("Loging in user: " + req.body.email);

    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            console.log(err);
            sendJSONresponse(res,404, {"message": err.message});
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res,200,{"token": token});
        } else {
            // If user is not found
            sendJSONresponse(res,401,info);
        }
    })(req, res);
    
});

// login user - facebook
router.post('/facebook', function (req, res, next) {
    console.log("Loging in user: " + req.body.email);
    request('https://graph.facebook.com/me', {qs: {access_token: req.body.socialToken}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // TODO - link accounts by mail
            var user = User.build({});
            sendJSONresponse(res,200,{"token": user.generateJwt()});
        } else {
            sendJSONresponse(res,401,{"message": 'Bad social token'});
        }
    });
});

// login user - google
router.post('/google', function (req, res, next) {
    console.log("Loging in user: " + req.body.email);
    request('https://www.googleapis.com/oauth2/v1/tokeninfo', {qs: {access_token: req.body.socialToken}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // TODO - link accounts by mail
            var user = User.build({});
            sendJSONresponse(res,200,{"token": user.generateJwt()});
        } else {
            sendJSONresponse(res,401,{"message": 'Bad social token'});
        }
    });
});

// get user byId
router.get('/:id', auth, function (req, res) {
    console.log("Getting user info: " + req.payload);

    sendJSONresponse(res,200,{
        "message": "User found: " + req.payload
    });
});

module.exports = router;