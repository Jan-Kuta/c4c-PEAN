var express = require('express');
var router = express.Router();

// create new user
router.post('/register', function (req, res, next) {
    console.log("Registering user: " + req.body.email);
    res.status(200);
    res.json({
        "message" : "User registered: " + req.body.email
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