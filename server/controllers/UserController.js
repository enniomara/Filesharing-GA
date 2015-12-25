// Load required packages
var UserModel = require('../models/UserModel');
var DBModel = UserModel.DBModel;

// Create endpoint /api/users for POST
exports.registerUser = function(jsonObject, callback) {

  var user = new DBModel({
    username: jsonObject.username,
    password: jsonObject.password,
    registrationIP: UserModel.ipToBuffer(jsonObject.registrationIP)
  });

  user.save(function(err) {
    // TODO - Run check if there is a current user that exist with that username
    if (err){
      callback(err, null);
    }
    else{
      var response = { message: 'New user has been added.' };
      callback(null, response);
    }
  });
};

// Create endpoint /api/users for GET
exports.getUserInfo = function(jsonObject, callback) {
  // Exclude sensitive information
  var fields = "-password -registrationIP"
  // TODO - check for injection possibilities
  DBModel.findOne({
    username: jsonObject.username
  }, fields, function(err, users) {
    if (err){
      callback(err, null);
    }
    else{
      callback(null, {
        success: true,
        user: users
      })
    }

  });
};


// TODO - code this
exports.deleteUser = function(){

};
