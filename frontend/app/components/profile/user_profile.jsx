import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { shuffle } from "lodash";
import NavBar from '../navbar/navbar_container';
import ResBox from './resbox'


class userProfile extends React.Component {
  constructor(props){
    super(props);
    
  }


  render(){
    return <div className="profile">
        <NavBar />
        <h1>Hello, {this.props.currentUser}</h1>

        <ul>
          {this.props.likedRes.map(el => <li key={el}>
              <ResBox resId={el} />
            </li>)}
        </ul>
      </div>;   
  }
}

export default withRouter(userProfile);
