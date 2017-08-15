var express = require('express');
var router = express.Router();
var Sector = require('../models').Sector;

var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// create new Sector
router.post('', auth, function (req, res) {
    console.log("Creating sector: " + req.body.name);
    Sector.create({
        sectorname: req.body.name,
        location: req.body.location,
        AreaId: req.body.areaId
    }).then(function(area) {
        res.json(area);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400);
        res.json({message: error.message});
    });
});

// get all sectors in area
router.get('/byarea/:id', function(req, res){
    Sector.findAll({
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