import React from 'react';
import { withRouter } from 'react-router-dom';
import { createRes, getRes } from "../../util/res_util";
import { getCurrentUser, updateUserLikeRes } from "../../util/user_util";

class Heart extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { heart: ""};
        this.res = null;
        this.heart = "";
        this.like = this.like.bind(this);
    }

    componentWillMount() {
        const res = this.props.currentRes;
        const user = this.props.currentUser;
      

            if (user.id) {
                if (user.likedRes.includes(res.id)) {
                    // this.setState({ heart: "liked" })
                    this.heart = "liked"
                    console.log("updated");

                } else {
                    // this.setState({ heart: "notLiked" })
                    this.heart = "notLiked"
                    console.log("no dbRes");

                }
            } else {
                // this.setState({ heart: "notLiked" })
                this.heart = "notLiked"
                console.log("no user");

            }
           
           
    
    
    }
    componentWillReceiveProps(newProps) {
        const res = newProps.currentRes;
        const user = newProps.currentUser;
        getRes(newProps.currentRes.id).then(response => {
            // console.log(response);

            this.res = response.data;
            // this.setState({db})
            
        })
        
            
            if (user.id) {
                if (user.likedRes.includes(res.id)) {
                    // this.setState({ heart: "liked" })
                    this.heart = "liked"
                    console.log("new","updated");
                    
                } else {
                    // this.setState({ heart: "notLiked" }) 
                    this.heart = "notLiked"
                    console.log("new","no dbRes");
                    
                }
            } else {
                // this.setState({ heart: "notLiked" })
                this.heart = "notLiked";
                console.log("new","no user");
                
            }
            
            
        
        
        
    }
    componentWillUnmount() {
        // localStorage.setItem("res", this.props.currentRes.id)
        // localStorage.setItem("heart", this.heart)
    }
    like(e) {
        
        e.preventDefault();
        if (!this.props.currentUser.id) {
            this.props.history.push('/login');
            return
        }
        const res = this.props.currentRes;

        
        if (this.res) {
            console.log("we have dbRes");
            
            if (this.heart === 'notLiked') {
                // this.setState({heart: "liked"})
                this.heart = "liked";
                updateUserLikeRes(this.props.currentUser.id, { resId: res.id, action: "add" })
               
            }else {
            //   this.setState({heart: "notLiked"})
                this.heart = "notLiked";
                updateUserLikeRes(this.props.currentUser.id, { resId: res.id, action: "delete" })
               
            }
        }else{
            console.log("no");
            // this.setState({heart: "liked"})
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
                // this.setState({dbRes: rest.data})
                
            })
            updateUserLikeRes(this.props.currentUser.id, {resId: res.id, action: "add"})
            
        }
    }

    render() {
        if (!this.props.currentRes.hours) {
            return null;
        };
        
        console.log(this.heart);
        
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