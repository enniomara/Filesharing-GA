// Load required packages
var UserModel = require('../models/UserModel');
var DBModel = UserModel.DBModel;

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new DBModel({
    username: req.body.username,
    password: req.body.password
  });
  console.log(req.body);

  user.save(function(err) {
    // TODO - Run check if there is a current user that exist with that username
    if (err){
      res.send(err);
    }
    else{
        res.json({ message: 'New user has been added.' });
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
