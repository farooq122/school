//Code Author: Sp1d3r
var mongoose = require('mongoose');
var router = require('express').Router();
var Haul=mongoose.model('haul');
var auth = require('../auth');
var multer  =require('../../middlewares/multer');
var multy = require('multer')
var upload  = multer.any()

//CRUD OPERATIONS
router.post('/createhauling',(req,res,next)=>{
  upload(req, res, function (err) {
    if (err instanceof multy.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({msg:'Multer Error',err:err})
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({msg:'Unknown Error',err:err})
    }
    var pictures=[];
    allfiles=req.files
    allfiles.forEach(element => {
      console.log('element',element);
      filepath=`images/${element.filename}`
      filename=element.filename
      pictures.push(filepath)
    });
    var haul  = new Haul();
    haul.trucksize  = req.body.trucksize;
    haul.bedsize  = req.body.bedsize;
    haul.description  = req.body.description;
    haul.travel_distance  = req.body.travel_distance;
    haul.zip  = req.body.zip;
    haul.worktype = req.body.worktype;
    haul.price  = req.body.price;
    haul.language = req.body.language;
    haul.contactMethod  = req.body.contactMethod;
    haul.image  = pictures;
    haul.package  = req.body.package;
    //haul.createdBy  = req.user._id;

    haul.save().then(function () {
      return res.json({ haul: haul });
    }).catch(next);
  })
})
router.get('/haul/:haulID',(req,res,next)=>{
    Haul.findById({_id:req.params.haulID},(err,document)=>{
      if(err){
        res.status(500).json({msg:'Server Error',error:err})
      }
      res.status(200).json({document:document})
    }).select('trucksize bedsize description travel_distance zip worktype price language contactMethod image package createdBy')
})
router.put('/haul/:haulID',(req,res,next)=>{
  upload(req, res, function (err) {
    if (err instanceof multy.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({msg:'Multer Error',err:err})
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({msg:'Unknown Error',err:err})
    }
    var pictures=[];
    allfiles=req.files
    allfiles.forEach(element => {
      console.log('element',element);
      filepath=`images/${element.filename}`
      filename=element.filename
      pictures.push(filepath)
    });
    var haul  = {}
    haul.trucksize  = req.body.trucksize;
    haul.bedsize  = req.body.bedsize;
    haul.description  = req.body.description;
    haul.travel_distance  = req.body.travel_distance;
    haul.zip  = req.body.zip;
    haul.worktype = req.body.worktype;
    haul.price  = req.body.price;
    haul.language = req.body.language;
    haul.contactMethod  = req.body.contactMethod;
    haul.image  = pictures;
    haul.package  = req.body.package;
    //haul.createdBy  = req.user._id;
    Haul.findByIdAndUpdate({_id:req.params.haulID},{$set:haul},{new:true},(err,document)=>{
      if(err){
        res.status(500).json({msg:'Server Error',error:err})
      }
      res.status(200).json({document:document});
    })
  })
})
router.delete('/haul/:haulID',(req,res,next)=>{
  Haul.findByIdAndRemove({_id:req.params.haulID},(err,document)=>{
    if(err){
      res.status(500).json({msg:'Server Error',error:err})
    }
    res.status(200).json({msg:'Advertisement Deleted',document:document});
  })
})
module.exports=router;
