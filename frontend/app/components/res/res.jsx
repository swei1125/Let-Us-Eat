import React from 'react';
import { withRouter } from 'react-router-dom';
import { shuffle } from "lodash";
import MapContainer from '../map/map_container';

class Res extends React.Component {
    constructor(props) {
        super(props);
        this.resIds = shuffle(props.resIds);
        this.idx = +props.match.params.idx;
    }
    componentWillMount() {
        this.props.clearCurrentRes();
    }

    componentDidMount() {
        this.props.fetchSingleRes(this.props.resIds[this.idx]);
    }

    componentWillReceiveProps(newProps) {
        if (+newProps.match.params.idx !== this.idx) {
            this.idx = +newProps.match.params.idx;
            newProps.fetchSingleRes(this.resIds[this.idx])
        }
    }

    goNext(e) {
        e.preventDefault();
        const term = this.props.match.params.term;
        const location = this.props.match.params.location;
        const radius = this.props.match.params.radius;
        const price = this.props.match.params.price
        
        if (this.idx === this.resIds.length - 1) {
            this.resIds = shuffle(this.props.resIds)
            this.props.history.push(`/search/${term}&${location}&${radius}&${price}&0`)
        } else {
            this.props.history.push(`/search/${term}&${location}&${radius}&${price}&${this.idx + 1}`)
        }
    }

    render() {
        if (!this.props.currentRes.id) {
            
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
        return <div className="res-wrapper">
            <button onClick={this.goNext.bind(this)}>Next</button>

            <div className="res-box">
              <div className="top">
                <div className="box-1">
                    <h1>{res.name}</h1>
                    <div className='stars' style={{ backgroundPosition: starPx }} ></div>
                    <h4 className='tags' >{res.categories.map(tag => tag.title).join(", ")}</h4>
                  
                </div>
                <div className='box-2 pic' >
                    <img className="img" src={this.props.currentRes.photos[0]} />
                </div>
                <div className='box-3 pic' >
                    <img className="img" src={this.props.currentRes.photos[1]} />
                </div>
              </div>
              <div className="bottom">
                <div className='box-4 pic' >
                    <img className="img" src={this.props.currentRes.photos[2]} />
                </div>
                <div className='box-5 map-box' >
                    <MapContainer />
                </div>
                <div className='box-6' ></div>
              </div>
            </div>
          </div>;
    }
 
}

export default withRouter(Res);