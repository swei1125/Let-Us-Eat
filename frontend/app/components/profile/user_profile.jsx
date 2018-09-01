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
    console.log(this.props.likedRes);
    return (
    <div className="profile">
      <NavBar /> 
        <div className="profileContent">
        <h1>Hello, {this.props.currentUser}!</h1>
        {this.props.likedRes.length === 0 ?
          <div className="defaultContent">
            <h2>You haven't liked any restaurants yet!</h2>
              <Link to="/"><img id="logoProfile" src={"../../../images/logoCover.png"} /></Link>
          </div>    
          :
          <ul>
            {this.props.likedRes.map(el => {
              <li key={el}>
                <ResBox resId={el} fetchSingleRes={this.props.fetchSingleRes}/>
                <button onClick={this.handleDelete.bind(this)}><img src={"../../../images/garbage.png"}/></button>
              </li>})
            }
          </ul>
        }
      </div>     
    </div>
    ) 
  }
}

export default withRouter(userProfile);
