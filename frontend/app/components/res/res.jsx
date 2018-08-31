import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { shuffle } from "lodash";
import MapContainer from '../map/map_container';
import NavBar from '../navbar/navbar';
import { css } from "react-emotion";
import { BeatLoader } from "react-spinners";
import { createRes, getRes } from '../../util/res_util';
import { create } from 'domain';

class Res extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.resIds = props.resIds;
        this.idx = +props.match.params.idx;
        
    }
    componentWillMount() {
        this.props.clearCurrentRes();
    }

    componentWillUnmount() {
        this.props.clearCurrentRes();
    }

    componentDidMount() {
        this.props.fetchSingleRes(this.props.resIds[this.idx]);
    }

    componentWillReceiveProps(newProps) {
        if (+newProps.match.params.idx !== this.idx) {
            this.idx = +newProps.match.params.idx;
            newProps.fetchSingleRes(this.resIds[this.idx])
                .then(() => this.setState({ loading: false }))
        }
    }

    goNext(e) {
        e.preventDefault();
        const term = this.props.match.params.term;
        const location = this.props.match.params.location;
        const radius = this.props.match.params.radius;
        const price = this.props.match.params.price;
        const open_now = this.props.match.params.open_now;
        this.setState({loading: true});
        if (this.idx === this.resIds.length - 1) {
            this.resIds = shuffle(this.props.resIds)
            this.props.history.push(`/search/${term}&${location}&${radius}&${price}&${open_now}&0`)
        } else {
            this.props.history.push(`/search/${term}&${location}&${radius}&${price}&${open_now}&${this.idx + 1}`)
        }
    }

    like(e) {
        e.preventDefault();
        if (!this.props.currentUser) {
            this.props.history.push('/login');
        }
        const res = this.props.currentRes;
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
        getRes(res.id).then(response => {
            if(response.data) {
                console.log(response.data._id);
            }else {
                createRes(data).then(respones => console.log(response))
            }
        })
    }

    render() {
        if (!this.props.currentRes.hours) {
            
            return null;
        };
        const res = this.props.currentRes;
        
        const starPos = {
            0: "0 0px",
            1: "0 -24px",
            1.5: "0 -48px",
            2: "0 -72px",
            2.5: "0 -96px",
            3: "0 -120px",
            3.5: "0 -144px",
            4: "0 -168px",
            4.5: "0 -192px",
            5: "0 -216px"
        };
        const starPx = starPos[res.rating];
        const override = css`
          display: block;
          margin: 0 auto;
          border-color: red;
          position: absolute;
          left: 43%;
          top: 320px;`;          

        return <div className="res-wrapper">
            <div className="res-box" >
                <NavBar />
                <BeatLoader
                    className={override}
                    sizeUnit={"px"}
                    size={50}
                    color={'white'}
                    loading={this.state.loading}
                />
                <div className="top-bottom-wrapper" style={{ opacity: this.state.loading ? "0.15" : "1" }}>
                    <div className="top">
                        <div className="box-1">
                            
                            <div className="info-wrapper">
                                <h1>{res.name}</h1>
                                <div className="stars" style={{ backgroundPosition: starPx }} />
                                <h4 className="tags">
                                    {res.categories.map(tag => tag.title).join(", ")}
                                </h4>
                                <div className="price-review">
                                    <span>{res.price}</span> | <span>{res.review_count}&nbsp;reviews</span>
                                </div>
                                <div className="heart">
                                    <i onClick={this.like.bind(this)} className="fas fa-heart" />
                                </div>
                            </div>
                        </div>
                        <div className="box-2" >
                            
                            <MapContainer />
                        </div>
                        <div className="box-3">
                        <div className="more-info">
                            <li className="phone">{res.display_phone}</li>
                            {res.location.display_address.map((el, i) => (
                                <li className="address" key={i}>
                                    {el}
                                </li>
                            ))}
                            <li className="is-open" style={{ color: res.hours[0].is_open_now ? "#23A923" : "#cc0000" }}>
                                {res.hours[0].is_open_now ? "Open Now" : "Close Now"}
                            </li>
                        </div>
                    </div>
                    </div>
                    <div className="bottom">
                    <div className="box-4 pic">
                    <img className="img" src={this.props.currentRes.photos[2]} />
                    </div>
                    <div className="box-5 pic">
                        <img className="img" src={this.props.currentRes.photos[0]} />
                    </div>
                    <div className="box-6 pic">
                    <img className="img" src={this.props.currentRes.photos[1]} />
                </div>
                </div>
                </div>
                <div className='btn'>
                    <button onClick={this.goNext.bind(this)}>Next</button>
                </div>
            </div>
          </div>;
    }
 
}

export default withRouter(Res);