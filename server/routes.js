'use strict';
module.exports = function(app, router){
  var userController = require('./controllers/UserController');
  var jwtAuthController = require('./controllers/jwtAuthController');
  var fileController = require('./controllers/FileController');

  var multer = require('multer');
  var upload = multer({dest: './uploads/tmp'});


  // ROUTES FOR OUR API
  // =============================================================================

  router.route('/users')
    .post(function(req, res){
        userController.registerUser({
          username: req.body.username,
          password: req.body.password,
          registrationIP: req.ip
          },
        function(error, data){
          // TODO - add user information already there
          if(error){
            res.status(500);
            res.send({message: "Something went wrong"});
          }
          else{
            res.send()
          }
        })
      })
    .get(function(req, res, next){
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];

      jwtAuthController.isAuthenticated(token, function(err, data){
        if(err){
          res.json(data);
        }
        else if (err && data.message == "No token provided") {
          res.status(403).send(data);
        }
        else{
          req.decoded = data;
          next();
        }
      })
    },
    function(req, res){
      var jsonObject = {
        username: req.decoded.username
      }
      userController.getUserInfo(jsonObject, function(error, data){
        if(error){
          res.json({
            success: false,
            message: "Something went wrong when getting user. Please check console for information. "
          });
        }
        else{
          res.json(data);
        }
      });
    });

  router.route('/authenticate').post(function(req, res){
    jwtAuthController.authenticate({
      username: req.body.username,
      password: req.body.password
    },
    function(error, data){
      if(error){
        if(data){
          res.json(data);
          return;
        }
        req.json({
          success: false,
          message: "Something went wrong. Check console for more information."
        });
      }
      else{
        res.json(data);
      }
    });
  });

  router.route('/test').post(upload.array('uploadFiles'), function(req, res) {
    // console.log(req.files)
    // TODO - run a check if there are multiple files
    // TODO - Remove the file from temp
    fileController.createFile(req.files[0], {_id: "567d3dda8f76663e1c603c8e", username: "ennio@g"}, function(err, data){
      if(err){
        console.log(err);
      }
    });
    res.send({
      message: "it works",
      ip: req.ip,
      files: req.files
    });

  });

  router.get('/members/info', function(req, res){
    res.json({message: "Not finished. Members/info"})
  })






  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api', router);




}
