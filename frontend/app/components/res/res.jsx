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
        return (
            <div className='res-wrapper'>
                <button onClick={this.goNext.bind(this)}>Next</button>

                <div className='res-box' >
                    <div className='pic-box' >
                        <img className='img' src={this.props.currentRes.image_url} />
                    </div>
                    <div className='content-wrapper' >
                        <div className='map-box' >
                            <MapContainer />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
 
}

export default withRouter(Res);