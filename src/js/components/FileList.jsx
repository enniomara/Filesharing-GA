import React from 'react';
import File from './FileList_File.jsx';

export default React.createClass({



  render() {
    return (
      <div>
        <span>Filelist for user</span>
        <div>
          {Object.keys(this.props.userInfo.user.files).map(function(value, index) {
             return <File indexInArray={index} />
          })}

        </div>
        <pre>
          {JSON.stringify(this.props.userInfo, null, ' ')}
        </pre>

      </div>
    );
  }
});
