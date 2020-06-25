//Code Author: Sp1d3r
var mongoose = require('mongoose');
var router = require('express').Router();
var NeedHaul=mongoose.model('needhaul');
var auth = require('../auth');
var multer=require('../../middlewares/multer')
var multy = require('multer');
var upload  = multer.any()

//CRUD OPERATIONS
router.post('/createneedHauling',(req,res,next)=>{
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
    var needHaul  = new NeedHaul();
    needHaul.description  = req.body.description;
    needHaul.travel_distance  = req.body.travel_distance;
    needHaul.zip  = req.body.zip;
    needHaul.worktype = req.body.worktype;
    needHaul.price  = req.body.price;
    needHaul.language = req.body.language;
    needHaul.contactMethod  = req.body.contactMethod;
    needHaul.image  = pictures;
    needHaul.package  = req.body.package;
    //needHaul.createdBy  = req.user._id;

    needHaul.save().then(function () {
      return res.json({ needHaul: needHaul });
    }).catch(next);
  })
})
router.get('/needHaul/:needHaulID',(req,res,next)=>{
    NeedHaul.findById({_id:req.params.needHaulID},(err,document)=>{
      if(err){
        res.status(500).json({msg:'Server Error',error:err})
      }
      res.status(200).json({document:document})
    }).select('description travel_distance zip worktype price language contactMethod image package createdBy')
})
router.put('/needHaul/:needHaulID',(req,res,next)=>{
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
    var needHaul  = {};
    needHaul.description  = req.body.description;
    needHaul.travel_distance  = req.body.travel_distance;
    needHaul.zip  = req.body.zip;
    needHaul.worktype = req.body.worktype;
    needHaul.price  = req.body.price;
    needHaul.language = req.body.language;
    needHaul.contactMethod  = req.body.contactMethod;
    needHaul.image  = pictures;
    needHaul.package  = req.body.package;
    //needHaul.createdBy  = req.user._id;
    NeedHaul.findByIdAndUpdate({_id:req.params.needHaulID},{$set:needHaul},{new:true},(err,document)=>{
      if(err){
        res.status(500).json({msg:'Server Error',error:err})
      }
      res.status(200).json({document:document});
    })
  })

})
router.delete('/needHaul/:needHaulID',(req,res,next)=>{
    NeedHaul.findByIdAndRemove({_id:req.params.needHaulID},(err,document)=>{
      if(err){
        res.status(500).json({msg:'Server Error',error:err})
      }
      res.status(200).json({msg:'Advertisement Deleted',document:document});
    })
})
module.exports=router;
