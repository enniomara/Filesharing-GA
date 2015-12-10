import React from 'react';
import {Link} from 'react-router';


class Navbar extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/home" className="navbar-brand">Home</Link>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Action <span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/log-in/">Log In</Link>
                  </li>
                  <li>
                    <Link to="/sign-up/">Sign Up</Link>
                  </li>
                  <li><a href="#">Log Out</a></li>
                </ul>
              </li>
            </ul>
          </div>{/* /.navbar-collapse */}
        </div>{/* /.container-fluid */}
      </nav>
    )
  }
}

export default Navbar;
