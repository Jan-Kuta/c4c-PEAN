var express = require('express');
var router = express.Router();
var User = require('../models').User;

// create new user
router.post('/register', function (req, res, next) {
    console.log("Registering user: " + req.body.email);
    
    var user = User.build({
        username: req.body.username,
        email: req.body.email
    });
    user.setPassword(req.body.password);
    user.save().then(usr => {
        console.log('User saved ', usr.dataValues);
        res.status(200);
        res.json({"message" : "User registered: " + req.body.email});
    })
    .catch( err => {
        console.log('ERROR: ',err.message);
        res.status(500);
        res.json({"message": err.message});
    });
});

// login user
router.post('/login', function (req, res, next) {
    console.log("Login user: " + req.body.email);
    res.status(200);
    res.json({
        "message" : "User logged in: " + req.body.email
    });
});

// get user byId
router.get('/:id', function (req, res, next) {
    console.log("Getting user info: " + req.body.email);
    res.status(200);
    res.json({
        "message" : "User found: " + req.body.email
    });
});
module.exports = router;