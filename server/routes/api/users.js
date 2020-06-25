var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var config=require('../../config/env/development');
const multer = require('../../middlewares/multer');
var multy=require('multer')
var upload=multer.single('image')

router.get('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.put('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.bio !== 'undefined') {
      user.bio = req.body.user.bio;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});

router.post('/users/login', function (req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  var user = new User();
  user.email = req.body.email;
  user.password = req.body.password;


  console.log("---->", user);

  passport.authenticate('local', { session: false }, function (err,user, info) {
    if (err) { return next(err); }
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      console.log('I am in error');
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/signup',function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multy.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({msg:'Multer Error',err:err})
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({msg:'Unknown Error',err:err})
    }
    // Everything went fine.
    var user = new User();
    // console.log('--->user creation');
    // console.log('-->',req.body);

    user.username = req.body.username;
    user.email = req.body.email;
    user.phone=req.body.phone;
    user.image= req.file ? `/images/${req.file.filename}` : '/images/user.jpg';
    user.setPassword(req.body.password);

    // console.log('--->',req.body.password);

    user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    }).catch(next);
  })

});
router.post('/emailverification',function (req,res,next){
    var email= req.body.email;
    if(email){
      const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: `${email}`,         // List of recipients
        subject: 'Email Verification', // Subject line
        text: 'To verify your email address click the link below' // Plain text body
    };
    config.transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
    res.status(200).json({data:'Verification Email send to '+email})
    }
})
module.exports = router;
