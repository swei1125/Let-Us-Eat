import React from 'react';
import { withRouter } from 'react-router-dom';
import { createRes, getRes } from "../../util/res_util";
import { getCurrentUser, likeRes } from "../../util/user_util";

class Heart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dbRes: null, heart: ""};
        this.like = this.like.bind(this);
    }

    componentDidMount() {
        const res = this.props.currentRes;
        const user = this.props.currentUser;
        getRes(res.id).then(response => {
            // console.log(response);
            
            this.setState({ dbRes: response.data })
            // console.log(this.state);
        })
        if (user.id) {
            if (this.state.dbRes && user.likedRes.includes(this.state.dbRes._id)) {
                this.setState({ heart: "liked" })
            } else {
                this.setState({heart: "notLiked"})
            }
        } else {
            this.setState({heart: "notLiked"})
        }
    
    }
    like(e) {
        
        e.preventDefault();
        if (!this.props.currentUser.id) {
            this.props.history.push('/login');
            return
        }
        const res = this.props.currentRes;

        
        if (this.state.dbRes) {
            // console.log("we have dbRes");
            
            if (this.state.heart === 'notLiked') {
                this.setState({heart: "liked"})
                likeRes(this.props.currentUser.id, { resId: this.state.dbRes, action: "add" })
               
            }else {
              this.setState({heart: "notLiked"})
                likeRes(this.props.currentUser.id, { resId: this.state.dbRes, action: "delete" })
               
            }
        }else{
            console.log("no");
            this.setState({heart: "liked"})
            const data = {
                yelpId: res.id,
                name: res.name,
                image_url: res.image_url,
                location: res.location.display_address,
                price: res.price,
                categories: res.categories.map(t => t.title),
                rating: res.rating,
                phone: res.display_phone
            }
            createRes(data).then(rest => {
                
                this.setState({dbRes: rest.data});
                likeRes(this.props.currentUser.id, {resId: rest.data._id, action: "add"})
                    
            })
            const theheart = document.getElementById("heart");
            // theheart.style.color = `#ff6666`;
        }
    }

    render() {
        if (!this.props.currentRes.hours) {
            return null;
        };
        return(
            <div className="heart">
                {this.state.heart === "liked" ? (
                    <i onClick={this.like} style={{color: "#ff6666"}} className="fas fa-heart" />
            ) : (
                    <i onClick={this.like} className="far fa-heart" />
                )}
            </div>
        )
    }
}

export default withRouter(Heart);