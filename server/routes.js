module.exports = function(app, router){
  var userController = require('./controllers/UserController');
  var jwtAuthController = require('./controllers/jwtAuthController');



  // ROUTES FOR OUR API
  // =============================================================================

  router.route('/users')
    .post(userController.postUsers)
    .get(jwtAuthController.isAuthenticated, userController.getUsers);

  router.route('/authenticate').post(jwtAuthController.authenticate);
  router.route('/test').post(jwtAuthController.isAuthenticated, function(req, res) {
    res.send({
      message: "it works"
    })
  });

  router.get('/members/info', function(req, res){
    res.json({message: "Not finished. Members/info"})
  })






  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api', router);




}
