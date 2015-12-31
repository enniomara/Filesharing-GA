var expect = require('chai').expect;
var config = require('./testConfig');
var UserController = require("../controllers/UserController");
var UserModel = require('../models/UserModel').DBModel;
var dropDatabase = require('./DBSetup')


var testUserInfo = config.testUserInfo;


var jwtAuthController = require('../controllers/jwtAuthController');
var userInfo = null;
var tempToken = "test";



describe("Jwt Authentication - functions", function() {
  // Always called when testing db
  dropDatabase();


  // create testuser to test functions
  before(function(done){
    UserController.registerUser(testUserInfo, function(error, data){
      if(error) throw error;
      done();
    });
  });



  describe("jwtAuthController.authenticate", function(){
    it("Authenticates the user and sends back a token", function() {
      jwtAuthController.authenticate(testUserInfo, function(error, data){
        expect(error).to.equal(null);
        expect(data).to.be.an('object');
        expect(data.token).to.be.a('string');
      });
    });

    it("Make sure errors are thrown when username/password are wrong", function(){
      // Wrong email
      jwtAuthController.authenticate({username: "asd", password: testUserInfo.password}, function(error, data){
        expect(error).to.equal(null);
        expect(data).to.be.an('object');
        expect(data.success).to.equal(false);
      });

      // Wrong password
      jwtAuthController.authenticate({username: testUserInfo.username, password: "wrongPassword"}, function(error, data){
        expect(error).to.equal(null);
        expect(data).to.be.an('object');
        expect(data.success).to.equal(false);
        expect(data.token).to.be.an('undefined');
      });
    });

  });


  describe("jwtAuthController.isAuthenticated", function(){
    before(function(done){
      jwtAuthController.authenticate(testUserInfo, function(error, data){
        if(error) throw error;
        tempToken = data.token;
        done();
      });
    });
    it("Ensures isAuthenticated is working properly. Uses different tokens", function(){

      // Correct token
      jwtAuthController.isAuthenticated(tempToken, function(err, response){
        expect(err).to.equal(null);
        expect(response.success).to.be.an('undefined');
        // If correct the authenticate function returns username of token user
        expect(response.username).to.not.be.a('undefined');
      });

      // Incorrect token
      jwtAuthController.isAuthenticated(tempToken + "123test", function(err, response){
        expect(err).to.equal(true);
        expect(response.sucess).to.equal(false);
      });

    });
  });

});
