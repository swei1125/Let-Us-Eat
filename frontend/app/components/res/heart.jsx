import React from 'react';
import { withRouter } from 'react-router-dom';
import { createRes, getRes } from "../../util/res_util";
import { getCurrentUser, likeRes } from "../../util/user_util";

class Heart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dbRes: null, heart: "notLiked"};
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentRes !== this.state.dbRes) {
            const res = newProps.currentRes;
            getRes(res.id).then(response => {
                this.setState({ dbRes: response.data })
            })
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
            if (this.state.heart === 'notLiked') {
                likeRes(this.props.currentUser.id, {resId: this.state.dbRes._id, action:"add"})
            }else {
              this.setState({heart: "notLiked"})
              likeRes(this.props.currentUser.id, {resId: this.state.dbRes, action: "delete"})
            }
        }else{
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
                this.setState({dbRes: rest});
                likeRes(this.props.currentUser.id, {resId: rest._id, action: "add"})
            })
        }

        getRes(res.id).then(response => {
            
            if (response.data) {
                getCurrentUser()

            } else {
                createRes(data).then(respones => console.log(response))
            }
        })
    }

    render() {
        if (!this.props.currentRes.hours) {
            return null;
        };

        const user = this.props.currentUser;
        let icon;
        if (user.id) {
            if (this.state.dbRes && user.likedRes.includes(this.state.dbRes._id)) {
                icon = <i onClick={this.like.bind(this)} className="fas fa-heart" />;
                this.setState({heart: "liked"})
            }else {
                icon = <i onClick={this.like.bind(this)} className="far fa-heart" />;
            }
        }else{
            icon = <i onClick={this.like.bind(this)} className="far fa-heart" />;
        }
        return(
            <div className="heart">
                {icon}
            </div>
        )
    }
}

export default withRouter(Heart);