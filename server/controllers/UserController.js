'use strict';
// Load required packages
var UserModel = require('../models/UserModel');
var DBModel = UserModel.DBModel;

// Create endpoint /api/users for POST
exports.registerUser = function(jsonObject, callback) {

  exports.getUserInfo({
    username: jsonObject.username
  }, function(error, user){
    // If no user is returned then throw error
    if(!user){
      callback(true,
        {
          message: 'The username you used is taken. Please try again'
        }
      );
    }
  });

  var ip = UserModel.ipToBuffer(jsonObject.registrationIP);
  // ipToBuffer returns false when IP is neither IPv4 nor IPv6
  if(ip === false){
    callback(true, {
      message: 'Could not validate IP.'
    });
  }


  var user = new DBModel({
    username: jsonObject.username,
    password: jsonObject.password,
    registrationIP: UserModel.ipToBuffer(jsonObject.registrationIP)
  });

  user.save(function(err) {
    if (err){
      callback(err, {
        message: 'Something went wrong while saving user. Registration was not successful.'
      });
    }
    else{
      callback(null, {
        message: 'New user has been added.'
      });
    }
  });
};

// Create endpoint /api/users for GET
exports.getUserInfo = function(jsonObject, callback) {
  // Exclude sensitive information
  var fields = '-password -registrationIP';
  // TODO - check for injection possibilities
  DBModel.findOne({
    username: jsonObject.username
  }, fields, function(err, users) {
    if (err){
      callback(err, null);
    }
    else if(!users){
      callback(null, {
        success:false,
        message: 'No user was found with the selected criteria'
      });
    }
    else{
      callback(null, {
        success: true,
        user: users
      });
    }

  });
};


// TODO - code this
exports.deleteUser = function(){

};
