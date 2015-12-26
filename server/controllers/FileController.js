var DBModel = require('../models/UserModel').DBModel;

// Have ability to post multiple data. Then have postFile split them into array and perform the upload one by one


// File is a req.file object
// File saving method: "objectID" + "UnixTime"
// userInfo is an array with objectID and username, retrieved from the token
exports.postFile = function(file, userInfo, callback){


}

// Fileinfo consists of user's _id and the file's _id
// Then the real path is retrieved from the storage and returned here
exports.retrieveFile = function(fileInfo, callback)

// Queries the database and replaces the "virtual" fileName with newName
// Fileinfo consists of user's _id and the file's _id
exports.renameFile = function(fileInfo, newName, callback){

}

// Fileinfo consists of user's _id and the file's _id
// This function first deletes the file, then the document from the database
// The file's path is retrieved from the database
exports.deleteFile = function(fileInfo, callback){

}
