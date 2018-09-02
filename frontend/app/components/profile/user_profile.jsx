import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { shuffle } from "lodash";
import NavBar from '../navbar/navbar_container';
import ResBoxContainer from './resbox_container';


class userProfile extends React.Component {
  
  componentWillMount() {
    this.props.getCurrentUser();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.currentUser.likedResYelpIds.length !== this.props.currentUser.likedResYelpIds.length) {
      this.props.getCurrentUser();
      
    }
  }


  render(){
    const list = this.props.currentUser.likedResIds;
   
    const defaultContent = list.length === 0 ? (
      <div className="defaultContent">
        <h1>You haven't liked any restaurants yet!</h1>
        <Link to="/"><div className="img"></div></Link>
      </div>  
    ) : (
      <div className='defaultContent'>
        <h1>You liked {list.length} restaurants</h1>
        <Link to="/">Click here to search more.</Link>
      </div>
    );
    return (
    <div className="profile">
      <NavBar /> 
      <div className="profileContent">
        <h1>Hello, {this.props.currentUser.name}</h1>
        {defaultContent}
        <ResBoxContainer />
        
      </div>     
    </div>
    ) 
  }
}

export default withRouter(userProfile);
