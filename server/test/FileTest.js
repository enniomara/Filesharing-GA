var expect = require('chai').expect;
var UserController = require("../controllers/UserController");
var UserModel = require('../models/UserModel').DBModel;
var config = require('./testConfig');
var dropDatabase = require('./DBSetup')


var testUserInfo = config.testUserInfo;
var testFileInfo = config.testFileInfo;
var userInfo = "";

var FileController = require("../controllers/FileController");
var fs = require('fs');
var path = require('path');


describe("File upload/retrieval", function(){
  // When sending a file, have the server return a success/failed on whether the file has been saved successfuly. Then let the frontend notify the user on the file status.

  describe(".postFile", function(){
  // Always called when testing db
  dropDatabase();



  // When sending a file, have the server return a success/failed on whether the file has been saved successfuly. Then let the frontend notify the user on the file status.
  var testFilesArray = [];

  var newFileFolder = path.join(__dirname, "./testFiles/tmp/");
  before(function(done){
    // Create user and save the info
    UserController.registerUser(testUserInfo, function(error, data){
      if(error){
        throw error;
      }

      UserModel.findOne({username: "test"}, function(err, pUser){
        if(err) throw err;
        userInfo = pUser;


        // Create testfiles to test the different
        for (var i = 1; i <= testFileInfo.numberOfFiles; i++) {
          // Creates file as 1stFile => 1, 2ndFile => 2 etc

          // Have to run this as an anonymous function to get writeFile to obey the for loop
          // http://stackoverflow.com/a/26679537
          (function(i){
            fs.writeFile(newFileFolder + i, testFileInfo.content + i, function(err){
              if(err) throw err;

              testFilesArray.push({
                userID: userInfo._id,
                filename: i,
                originalname: testFileInfo.content + i
              });
            });
          }(i));
        }
        done();
      });


    });



  });

  // Remove testfiles
  after(function(done){
    for (var file in testFilesArray) {
      fs.unlink(newFileFolder + testFilesArray[file].filename, function(err){
        if(err) throw err;
      });
    }
    done();

  });

  describe(".createFile", function(){
    // Correct file provided. Check if file is created
    it("Should create the file if correct information is provided", function(){
      FileController.createFile(testFilesArray, userInfo, function(err, response){
        expect(err).to.be.equal(null);
        expect(response).to.be.an('object');
        expect(response.success).to.be.equal(true);

        // TODO - Check that file is created
      });
    });

    // No file provided
    it("Should throw an error when there are no files provided", function(){
      FileController.createFile([], userInfo, function(err, response){
        expect(err).to.not.be.equal(null);
        expect(response).to.be.an('undefined');

      });

    })

    // Wrong userInfo provided
    it("Should throw an error if there are no users with the provided id/username", function(){
      FileController.createFile(testFilesArray, userInfo, function(err, response){
        expect(err).to.not.be.equal(null);
        // For the moment it returns true when it cannot find a user
        expect(err).to.be.equal(true);
        expect(response).to.be.equal(null);
        // TODO - Check that no files were created
      });

    });


  });

  describe(".renameFile", function() {
    // Wrong user:_id
    // Wrong file:_id => user has no file like that
    // Correct info provided, check DB fiels are updated
  })

  describe(".deleteFile", function() {
    // File is found with fileName
    // Wrong user:_id
    // Wrong file:_id => user has no file like that
  })

});
