import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { shuffle } from "lodash";
import NavBar from '../navbar/navbar_container';
import ResBox from './resbox'


class userProfile extends React.Component {
  
  componentDidMount() {
    this.props.getCurrentUser();
  }

  // <button onClick={this.handleDelete.bind(this)}><img src={"../../../images/garbage.png"}/></button>

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
        <ul>
          {list.map(res => <ResBox delete={this.props.deleteRes} key={res.name}/>)}
        </ul>
      </div>     
    </div>
    ) 
  }
}

export default withRouter(userProfile);
