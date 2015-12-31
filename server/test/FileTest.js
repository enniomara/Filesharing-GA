var expect = require('chai').expect;
var config = require('./testConfig');
var dropDatabase = require('./DBSetup')


describe("File upload/retrieval", function(){
  // When sending a file, have the server return a success/failed on whether the file has been saved successfuly. Then let the frontend notify the user on the file status.

  describe(".postFile", function(){
    // Always called when testing db
  	dropDatabase();
    // No file provided

    // Wrong userInfo provided

    // Correct file provided. Check if file is created
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
