import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {clickMenu: false};
    }

    handleClick(e){
    e.preventDefault();
    this.setState({clickMenu: true})
    setTimeout(() => this.setState({ clickMenu: false}), 3000)
    }

    render() { 
        const loggedIn = <div>
            <ul className="sessionul">
              <li>
                {this.props.location.pathname === "/profile" ? < Link to="/">Search</Link>:<Link to="/profile">Profile</Link>}
              </li>
              <li>
                <button onClick={()=>this.props.logoutUser()}>Log Out</button>
              </li>
            </ul>
            <div className="dropdown" onClick={this.handleClick.bind(this)}>
            {this.state.clickMenu ?
              <ul className="menuList">
                <li>
                    {this.props.location.pathname === "/profile" ? < Link to="/">Search</Link> : <Link to="/profile">Profile</Link>}
                </li>
                <li>
                    <button onClick={() => this.props.logoutUser()}>Log Out</button>
                </li> 
              </ul> 
              :
              null
            }
            </div>
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
            <div className="dropdown" onClick={this.handleClick.bind(this)}>
            {this.state.clickMenu ?
              <ul className="menuList">
                <li>
                  <Link to="/login">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
              :
              null
            }
            </div>
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