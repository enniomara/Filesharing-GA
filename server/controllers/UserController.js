// Load required packages
var UserModel = require('../models/UserModel');
var DBModel = UserModel.DBModel;

// Create endpoint /api/users for POST
exports.registerUser = function(jsonObject, callback) {

  var user = new DBModel({
    username: jsonObject.username,
    password: jsonObject.password
  });

  user.save(function(err) {
    // TODO - Run check if there is a current user that exist with that username
    if (err){
      callback(error, null)
    }
    else{
      var reponse = { message: 'New user has been added.' };
      callback(null, response)
    }
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  DBModel.find(function(err, users) {
    if (err){
      res.send(err);
    }
    else{
      res.json(users);
    }

  });
};

exports.deleteUser = function(){

};
