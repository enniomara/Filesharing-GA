var jwt    = require('jsonwebtoken'); // used to create, sign, and verify
var UserModel = require('../models/UserModel');
var DBModel = UserModel.DBModel;
var configDB = require('../db/config.js');


exports.authenticate = function(req, res, callback){
  var pUsername = req.body.username;
  var pPassword = req.body.password;
  // find the user
  DBModel.findOne({
    // TODO - run a check for username/check for sql/noSQL injection
    username: pUsername
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json(
        {


          success: false,
          message: 'Authentication failed. User not found.'
        }
      );
    }
    else if (user) {

      // check if password matches
      UserModel.verifyPassword(pPassword, user.password, function(error, isMatch){
        if (err) {
          res.json({
            success: false,
            message: "Password verifying went wrong"
          })
        }
        // Password did not match
        if (!isMatch) {
          res.json(
            {
              success: false,
              message: 'Authentication failed. Wrong password.'
            }
          );
        }

        // if user is found and password is right
        // create a token
        var token = jwt.sign({username: user.username}, configDB.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      })


    }

  });
}

exports.isAuthenticated = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, configDB.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  }
  else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}
