var path = require('path');

'use strict';
module.exports = {

    'url' : 'mongodb://localhost:27017/filesharing', // Production database
    'testUrl': 'mongodb://localhost:27017/filesharing_test',
    'secret' : 'Super Secret Session Key',

    'uploadFilesFolder': path.join(__dirname, '../uploads/')
};
