var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var Area = require('../models').Sector;
=======
var Sector = require('../models').Sector;
>>>>>>> 69ef17469c082547de49ac4b589978c2c5ac1107

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

<<<<<<< HEAD
// create new sector
router.post('', auth, function (req, res) {
    console.log("Creating area: " + req.body.name);
    Area.create({
        sectorname: req.body.name,
        location: req.body.location,
        AreaId: req.body.areaId
    }).then(function(sector) {
        res.json(sector);
=======
// create new Sector
router.post('', auth, function (req, res) {
    console.log("Creating sector: " + req.body.name);
    Sector.create({
        sectorname: req.body.name,
        location: req.body.location,
        AreaId: req.body.areaId
    }).then(function(area) {
        res.json(area);
>>>>>>> 69ef17469c082547de49ac4b589978c2c5ac1107
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

// get all sectors in area
router.get('/byarea/:id', function(req, res){
<<<<<<< HEAD
    Area.findAll({
=======
    Sector.findAll({
>>>>>>> 69ef17469c082547de49ac4b589978c2c5ac1107
        where:{
            AreaId: req.params.id
        }
    }).then(function(sectors){
        res.json(sectors);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

module.exports = router;