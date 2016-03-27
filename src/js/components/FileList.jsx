import React from 'react';
import File from './FileList_File.jsx';
import $ from 'jquery';


export default React.createClass({
  getInitialState: function() {
  return {
      fileList: []
    };
  },

  componentDidMount: function(){
    this.serverRequest = $.get(
      {
        url: "http://localhost:3232/api/users/filelist",
        beforeSend: function(xhr){
          xhr.setRequestHeader('x-access-token', '$token');
        },
      },
      // The success function
      function(result) {

        this.setState({
          fileList: result.files
        });
        console.log(result);
      }.bind(this));
  },


  render() {
    var state = this.state;
    return (
      <div>
        <span>Filelist for user</span>
        <div className="list-group">
          {Object.keys(state.fileList).map(function(value, index) {
            console.log(state.fileList);
             return <File fileInfo={state.fileList[index]} />
          })}

        </div>
        <pre>
          {JSON.stringify(this.state.fileList, null, ' ')}
        </pre>

      </div>
    );
  }
});
