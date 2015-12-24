var expect = require('chai').expect;
var UserController = require("../controllers/UserController");
var UserModel = require('../models/UserModel').DBModel;
var mongoose = require('mongoose');
var config = require('./testConfig');
mongoose.connect(config.testUrl);

var testUserInfo = config.testUserInfo;
var userInfo = null;


describe("UserModel", function(){

  // create testuser to test functions
  before(function(done){

    UserController.registerUser(testUserInfo, function(error, data){
      if(!error){

        UserModel.findOne({username: "test"}, function(err, pUser){

          userInfo = pUser;
          done();
        });

      }
      else{
        done();
      }
    });
  });


  // Remove user after everything
  after(function(done){
    UserModel.remove({_id: userInfo._id}, done);
  });

  it("Checks registrationIP is saved as buffer", function(){
    expect(userInfo.registrationIP).to.not.equal(testUserInfo.registrationIP);
    expect(userInfo.registrationIP).to.not.be.a('string');
  });
  it("Ensures the password is encrypted and that the encryption worked", function(){
    expect(userInfo.password).to.not.be.equal(testUserInfo.password);
  })

});
