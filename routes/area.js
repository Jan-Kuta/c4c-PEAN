var express = require('express');
var router = express.Router();
var Area = require('../models').Area;

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// create new Area
router.post('', auth, function (req, res) {
    console.log("Creating area: " + req.body.name);
    Area.create({
        areaname: req.body.name,
        location: req.body.location,
        CountryId: req.body.countryId
    }).then(function(area) {
        res.json(area);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

// get all areas in country
router.get('/bycountry/:id', function(req, res){
    Area.findAll({
        where:{
            CountryId: req.params.id
        }
    }).then(function(areas){
        res.json(areas);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

// get all areas in rectangle
router.get('/bylocation/:lngLT/:latLT/:lngRB/:latRB', function(req, res){
    Area.getByLocation(req.params.lngLT, req.params.latLT, req.params.lngRB, req.params.latRB)
    .then(function(areas){
        res.json(areas);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

module.exports = router;