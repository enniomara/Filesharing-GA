import React from 'react';
import $ from 'jquery';

export default React.createClass({

  downloadFile(event) {
    event.preventDefault();
    window.open('http://localhost:3232/api/files?fileId=' + this.props.fileInfo._id + '&token=');

  },

  render() {
    return (
      <div>
        <div className="list-group-item row">
          <div className="col-md-10">
            <a href="#" onClick={this.downloadFile} >{this.props.fileInfo.virtualFileName}</a>
            <p>{this.props.fileInfo.uploadDate}</p>
          </div>

          <div className="col-md-2">
            <a href="javascript:void(0)" onClick={this.downloadFile}>Download</a>
          </div>
        </div>

      </div>
    );
  }
});
