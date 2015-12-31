var expect = require('chai').expect;
var UserController = require("../controllers/UserController");
var UserModel = require('../models/UserModel').DBModel;
var config = require('./testConfig');
var dropDatabase = require('./DBSetup');



var testUserInfo = config.testUserInfo;
var userInfoBefore = null;

describe("UserModel", function(){
  // Always called when testing db
  dropDatabase();

  // create testuser to test functions
  before(function(done){

    UserController.registerUser(testUserInfo, function(error, data){
      if(!error){

        UserModel.findOne({username: "test"}, function(err, pUser){

          userInfo = pUser;
      done();
    });
  });

  // Remove user after everything
  after(function(done){
    UserModel.remove({_id: userInfoBefore._id}, done);
  });


  describe("UserModel.registerUser", function(){
    var userInfo = null;

    before(function(done){
      UserModel.findOne({username: "test"}, function(err, pUser){
        userInfo = userInfoBefore = pUser;
        done();
      });
    })

    it("Checks registrationIP is saved as buffer", function(){
      expect(userInfo.registrationIP).to.not.equal(testUserInfo.registrationIP);
      expect(userInfo.registrationIP).to.not.be.a('string');
    });
    it("Ensures the password is encrypted and that the encryption worked", function(){
      expect(userInfo.password).to.not.be.equal(testUserInfo.password);
    });
  });

  describe("UserModel.getUserInfo", function(){
    var userInfo = null;
    before(function(done){
      UserController.getUserInfo({username: "test"}, function(error, response){
        if(!error){
          userInfo = response;
          done();
        }
      });
    });

    it("Ensures no sensitive information is printed out", function(){
      expect(userInfo.user.password).to.be.an('undefined');
      expect(userInfo.user.registrationIP).to.be.an('undefined');
    });
    it("Ensures some useful information is printed out and no error is found", function(){
      expect(userInfo).to.be.an('object');
      expect(userInfo.success).to.equal(true);
      expect(userInfo.user).to.be.an('object');
    });

    it("Ensures there is no response if an error occurs", function(){
      UserController.getUserInfo({username: "wrongUsername"}, function(error, response){
        expect(error).to.equal(null);
        expect(response.success).to.equal(false);
        expect(response.message).to.not.be.an('undefined');
      });
    })
  });
});
