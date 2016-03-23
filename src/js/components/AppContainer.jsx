import React from 'react';
import App from './App.jsx';
import Navbar from './Navbar.jsx'
import Home from './Home.jsx';
import Login from './Login.jsx'
import {Link, RouteHandler} from 'react-router'


export default React.createClass({
/*  _onChange() {
    this.setState(TodoStore.getAll());
  },

  getInitialState() {
    return TodoStore.getAll();
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  handleAddTask(e) {
    let title = prompt('Enter task title:');
    if (title) {
      ActionCreator.addItem(title);
    }
  },

  handleClear(e) {
    ActionCreator.clearList();
  },*/

  render() {
    /*let {tasks} = this.state;*/
    return (
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
  /*<TaskList tasks={tasks} />
  <button onClick={onAddTask}>Add New</button>
  <button onClick={onClear}>Clear List</button>*/
});
