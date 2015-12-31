var mongoose = require('mongoose');
var config = require('./testConfig');

mongoose.connect(config.testUrl);

var connection = mongoose.connection;

before(function(done) {
  return connection.on('open', function() {
    return connection.db.dropDatabase(done);
  });
});

after(function(done) {
  return connection.close(done);
});

module.exports = function() {
  return after(function(done) {
    return connection.db.dropDatabase(done);
  });
};

// Thanks to https://gist.github.com/nkzawa/4971592
