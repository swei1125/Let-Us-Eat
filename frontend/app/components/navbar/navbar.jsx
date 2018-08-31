import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavBar extends React.Component {

    render() {
        
        const loggedIn = <div>
            <ul className="sessionul">
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
                <button onClick={()=>this.props.logoutUser()}>Log Out</button>
              </li>
            </ul>
            <ul className="dropdown">
              <li>
                <Link to="/">Profile</Link>
              </li>
              <li>
                <button onClick={()=>this.props.logoutUser()}>Log Out</button>
              </li>
            </ul>
          </div>;
        const notLoggedIn = (<div>
            <ul className="sessionul">
                <li>
                    <Link to="/login">Sign in</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ul>
            <ul className="dropdown">
                <li>
                    <Link to="/login">Sign in</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
            </ul>
        </div> )
        return (
        <div className="navbar">
            <Link to="/"><h1>LET'S EAT</h1></Link>
            <div className="session">
                {this.props.session ? loggedIn : notLoggedIn  }
            </div>
        </div>
        );
    }
}

export default NavBar;