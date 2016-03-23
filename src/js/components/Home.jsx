import React from 'react';
import FileList from './FileList.jsx';

export default React.createClass({

  getUserInfo() {
    var userInfoJson = {
    "success": true,
      "user": {
        "_id": "567d3dda8f76663e1c603c8e",
        "username": "ennio@g",
        "files": [
          {
            "virtualFileName": "test"
          },
          {
            "virtualFileName": "est"
          }
        ],
        "__v": 0,
        "registrationDate": "2015-12-25T13:00:10.996Z"
      }
    };
    return userInfoJson;

  },

  render() {
    return (
      <div>
        <div className='alert alert-info'>
          Hello from Home Component
        </div>
        <FileList userInfo={this.getUserInfo()}/>

      </div>

    );
  }
});
