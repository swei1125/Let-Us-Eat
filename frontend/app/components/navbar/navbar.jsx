import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return <div className="navbar">
        <h1>
          <Link to='/'>LET'S EAT</Link>
        </h1>
        <div className="session">
          <ul className="sessionul">
            <li>
              <a>Sign in</a>
            </li>
            <li>
              <a>Sign up</a>
            </li>
          </ul>
          <ul className="dropdown">
            <li>
              <a>Sign in</a>
            </li>
            <li>
              <a>Sign up</a>
            </li>
          </ul>
        </div>
      </div>;
  }
}

export default NavBar;