'use strict';
// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ip = require('ip');


// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  registrationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  lastOnline: {
    type: Date
  },
  registrationIP: {
    type: Buffer,
    required: true
  },
  lastIP: {
    type: Buffer
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

exports.verifyPassword = function(providedPassword, dbPassword, cb) {
  bcrypt.compare(providedPassword, dbPassword, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

exports.ipToBuffer = function(IP){
  // An IP is either IPv4 or IPv6
  if(ip.isV4Format(IP) === false || ip.isV6Format(IP) === false){
    return false;
  }

  return ip.toBuffer(IP);

};

// Export the Mongoose model
exports.DBModel = mongoose.model('users', UserSchema);
