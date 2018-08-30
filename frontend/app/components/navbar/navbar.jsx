import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div className="navbar">
            <Link to="/"><h1>LET'S EAT</h1></Link>
            <div className="session">
                {this.props.session ? 
                <div>
                    <ul className="sessionul">
                        <li>
                            <Link to="/">Profile</Link>  
                        </li>
                    </ul>
                    <ul className="dropdown">
                        <li>
                            <Link to="/">Profile</Link>
                        </li>
                    </ul>
                </div> 
                
                :
                <div>
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
                </div>        
                }
            </div>
        </div>
        );
    }
}

export default NavBar;