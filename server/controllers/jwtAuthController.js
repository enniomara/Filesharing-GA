'use strict';
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify
var UserModel = require('../models/UserModel');
var DBModel = UserModel.DBModel;
var configDB = require('../db/config.js');


exports.authenticate = function(jsonObject, callback){
  var pUsername = jsonObject.username;
  var pPassword = jsonObject.password;
  // find the user
  DBModel.findOne({
    // TODO - run a check for username/check for sql/noSQL injection
    username: pUsername
  }, function(err, user) {

    if (err) callback(err, null);

    if (!user) {
      var response = {
        success: false,
        message: 'Authentication failed. User not found.'
      };
      callback(true, response);
    }
    else if (user) {

      // check if password matches
      UserModel.verifyPassword(pPassword, user.password, function(error, isMatch){
        if (error) {
          callback(error, {
            success: false,
            message: 'Password verifying went wrong. See console for more information.'
          });
          return;
        }
        // Password did not match
        if (!isMatch) {
          callback(true, {
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
          return;
        }

        // if user is found and password is right
        // create a token
        var token = jwt.sign({username: user.username, id: user._id}, configDB.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        var response = {
          success: true,
          message: 'Enjoy your token!',
          token: token
        };
        callback(null, response);
      });


    }

  });
};

// TODO - Check error cases
exports.isAuthenticated = function(token, callback) {


  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, configDB.secret, function(err, decoded) {
      if (err) {
        var response = {
          success: false,
          message: 'Failed to authenticate token.'
        };
        return callback(err, response);
      }
      else {
        // if everything is good, save to request for use in other routes
        return callback(null, decoded);
      }
    });

  }
  else {
    // if there is no token
    // return an error
    callback(true, {
        success: false,
        message: 'No token provided.'
    });
  }
};
