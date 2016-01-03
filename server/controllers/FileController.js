'use strict';
var DBModel = require('../models/UserModel').DBModel;
var FileModel = require('../models/FileModel');
var FileModelDB = FileModel.FileModelDB;
var UserController = require('../controllers/UserController')
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var typeOf = require('typeof');
var config = require('../db/config');

// Have ability to post multiple data. Then have postFile split them into array and perform the upload one by one


// File is a req.file[0] object
// File saving method: "uuid.v1()" + "user._id"
// userInfo is an array with objectID and username, retrieved from the token
// TODO - remove file when everything is saved
exports.createFile = function(file, userInfo, callback){
  var toSaveFiles = [];

  // Check if there is a user with the provided info
  var DBUserInfo = UserController.getUserInfo({username: userInfo.username}, function(error, user){
    if(!user){
      callback(true, null);
    }
  })

  // File should be one file(object with info), not an array of files
  if(typeOf(file) != 'object'){
    callback({error: true, message: file}, null);
    return;
  }

  var fileData = {};
  // Read the file from temp path(inside req.file)
  fs.readFile(config.uploadFilesFolder + "tmp/" + file.filename, function(err, data){
    var newFileName = uuid.v1() + userInfo._id;

    if(!err){
      fs.writeFile(config.uploadFilesFolder + newFileName, data, function(error){
        if(!error){
          fileData.userID = userInfo._id;
          fileData.virtualFileName = file.originalname;
          fileData.realFileName = newFileName;

          var fileDB = new FileModelDB(fileData);
          fileDB.save(function(err){
            if(!err){
              callback(null, {
                success: true,
                message: "Successfully saved the file."
              })
            }
            else{
              callback(err, null);
            }
          });

        }
        else{
          callback(error, null);
        }
      });
    }
    else{
      callback(err, null);
    }


  });
  // This state should never be reached



};

// Fileinfo consists of user's _id and the file's _id
// Then the real path is retrieved from the storage and returned here
// callback => (error, data)
exports.retrieveFile = function(fileInfo, callback) {

  // Get the requested file's information and retrieve it from the filesystem
  exports.getFileInfo(fileInfo.fileID, fileInfo.userID, function(error, response) {
    if (error) {
      callback(error, {
        message: "Something went wrong when getting the file's data",
        error: error
      });
      return;
    }

    if (response.success !== true) {
      callback(true, {
        message: "No files were found."
      });
      return;
    }

    // If all passes,retrieve the file
    fs.readFile(path.join(config.uploadFilesFolder, response.file.realFileName), function(err, data) {
      if (err) {
        callback(err, {
          message: "There was an error when reading the file."
        });
        return;
      }

      callback(null, {
        success: true,
        fileName: response.file.virtualFileName,
        file: data
      });

    });
  });
};
// Queries the database and replaces the "virtual" fileName with newName
// Fileinfo consists of user's _id and the file's _id
exports.renameFile = function(fileInfo, newName, callback){

};

// Fileinfo consists of user's _id and the file's _id
// This function first deletes the file, then the document from the database
// The file's path is retrieved from the database
exports.deleteFile = function(fileInfo, callback){

}



// TODO - write test for this
// Gets a file's fields based on the file_id. The user_id is there for security purposes(it disallows if the user_id is not found on the file)
exports.getFileInfo = function(file_id, user_id, callback){
  if(typeof file_id !== 'string' || typeof user_id !== 'string'){
    callback(true, null);
  }
  // Use "-fieldName" to exclude unwanted/sensitive fields
  var fields = "";
  // TODO - check for injection
  FileModelDB.findOne({
    _id: file_id,
    userID: user_id
  }, fields, function(err, files){
    if(err){
      callback(err, null);
    }
    else if(!files){
      callback(null, {
        success: false,
        message: "No files were found with the selected criteria."
      });
    }
    else{
      // All good
      callback(null, {
        success: true,
        file: files
      });
    }
  });
}
