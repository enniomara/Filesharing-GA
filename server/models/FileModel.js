'use strict';
// Load required packages
var mongoose = require('mongoose');

// Define our fileschema
var FileSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  virtualFileName: {
    type: String
  },
  realFileName: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});


exports.FileModelDB = mongoose.model('files', FileSchema);
