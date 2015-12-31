var DBModel = require('../models/UserModel').DBModel;
var FileModelDB = require('../models/FileModel').FileModelDB;
var UserController = require('../controllers/UserController')
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');

// Have ability to post multiple data. Then have postFile split them into array and perform the upload one by one


// File is a req.file[0] object
// File saving method: "uuid.v1()" + "user._id"
// userInfo is an array with objectID and username, retrieved from the token
exports.createFile = function(file, userInfo, callback){
  var storagePath = path.join(__dirname, "../uploads/");
  var toSaveFiles = [];

  // Check if there is a user with the provided info
  var DBUserInfo = UserController.getUserInfo({username: userInfo.username}, function(error, user){
    if(!user){
      callback(true, null);
    }
  })


  var fileData = {};
  // Read the file from temp path(inside req.file)
  fs.readFile(storagePath + "tmp/" + file.filename, function(err, data){
    var newFileName = uuid.v1() + userInfo._id;

    if(!err){
      fs.writeFile(storagePath + newFileName, data, function(error){
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
exports.retrieveFile = function(fileInfo, callback){
  
}

// Queries the database and replaces the "virtual" fileName with newName
// Fileinfo consists of user's _id and the file's _id
exports.renameFile = function(fileInfo, newName, callback){

};

// Fileinfo consists of user's _id and the file's _id
// This function first deletes the file, then the document from the database
// The file's path is retrieved from the database
exports.deleteFile = function(fileInfo, callback){

}
