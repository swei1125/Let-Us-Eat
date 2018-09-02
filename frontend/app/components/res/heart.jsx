import React from 'react';
import { withRouter } from 'react-router-dom';
import { createRes, getRes } from "../../util/res_util";
import { updateUserLikeRes } from "../../util/user_util";

class Heart extends React.Component {
    constructor(props) {
        super(props);
        this.res = null;
        this.heart = "";
        this.like = this.like.bind(this);
    }

    componentWillMount() {
        const res = this.props.currentRes;
        const user = this.props.currentUser;
        
        getRes(res.id).then(response => {

            this.res = response.data;
        })
        
        if (user.id) {
            if (user.likedResYelpIds && user.likedResYelpIds.includes(res.id)) {
              this.heart = "liked";
            } else {
              this.heart = "notLiked";
            }
        } else {
            this.heart = "notLiked";
        }
    }
    componentWillReceiveProps(newProps) {
        const res = newProps.currentRes;
        const user = newProps.currentUser;
        this.res = null;
        getRes(newProps.currentRes.id).then(response => {
            this.res = response.data;
        })
        if (user.id) {
            if (user.likedResYelpIds && user.likedResYelpIds.includes(res.id)) {
              this.heart = "liked";
            } else {
              this.heart = "notLiked";
            }
        } else {
            this.heart = "notLiked";
        }
        
    }
 
    like(e) {
        
        e.preventDefault();
        if (!this.props.currentUser.id) {
            this.props.history.push('/login');
            return
        }
        const res = this.props.currentRes;
        if (this.res) {
            
            if (this.heart === 'notLiked') {
                this.heart = "liked";
                updateUserLikeRes(this.props.currentUser.id, { yelpId: res.id,resId: this.res._id, action: "add" })
               
            }else {
                this.heart = "notLiked";
                updateUserLikeRes(this.props.currentUser.id, { yelpId: res.id, resId: this.res._id, action: "delete" })
               
            }
        }else{
            this.heart = "liked";
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
                
                this.res = rest.data;                
                updateUserLikeRes(this.props.currentUser.id, { yelpId: res.id, resId: rest.data._id, action: "add"})
            })            
        }
        
    }

    render() {
        if (!this.props.currentRes.hours) {
            return null;
        };
                
        return(
            <div className="heart">
                {this.heart === "liked" ? (
                    <i onClick={this.like} style={{color: "#ff6666"}} className="fas fa-heart" />
            ) : (
                    <i onClick={this.like} className="far fa-heart" />
                )}
            </div>
        )
    }
}

export default withRouter(Heart);