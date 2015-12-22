module.exports = function(app, router){
  var userController = require('./controllers/UserController');
  var jwtAuthController = require('./controllers/jwtAuthController');



  // ROUTES FOR OUR API
  // =============================================================================

  router.route('/users')
    .post(userController.registerUser({
      username: req.body.username,
      password: req.body.password
    }, function(error, data){
      if(err){
        req.status(500);
        res.send({message: "Something went wrong"});
      }
      else{
        res.send()
      }
    }))
    .get(jwtAuthController.isAuthenticated, userController.getUsers);

  router.route('/authenticate').post(jwtAuthController.authenticate);
  router.route('/test').post(function(req, res) {
    res.send({
      message: "it works",
      ip: req.ip
    })
  });

  router.get('/members/info', function(req, res){
    res.json({message: "Not finished. Members/info"})
  })






  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api', router);




}
