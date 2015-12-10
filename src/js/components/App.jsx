import React, {PropTypes} from 'react';
import TaskList from './TaskList.jsx';
import {Link, RouteHandler} from 'react-router'
import Navbar from './Navbar.jsx'

class App extends React.Component {
  getDefaultProps() {
    return {
      tasks: []
    }
  }


  render() {
    let {onAddTask, onClear, tasks} = this.props;
    return (
      <div>
      

      </div>
    );
  }
}


export default App;
