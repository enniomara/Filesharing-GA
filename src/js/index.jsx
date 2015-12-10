import React from 'react';
import AppContainer from './components/AppContainer.jsx';

import Router from 'react-router';
import {Route} from 'react-router';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx'

let history = createBrowserHistory();


let routes = (
  <Route path="/" component={AppContainer}>
    <Route path="home" component={Home}/>
    <Route path="log-in" component={Login}/>
  </Route>
);


React.render(<Router>{routes}</Router>, document.getElementById('main'))
