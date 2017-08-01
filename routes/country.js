var express = require('express');
var router = express.Router();
var Country = require('../models').Country;

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// create new Country
router.post('', auth, function (req, res) {
    console.log("Creating Country: " + req.body.name);
    Country.create({
        countryname: req.body.name
    }).then(function(country) {
        res.json(country);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

// get all countries
router.get('', function(req, res){
    Country.findAll({}).then(function(countries){
        res.json(countries);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

module.exports = router;