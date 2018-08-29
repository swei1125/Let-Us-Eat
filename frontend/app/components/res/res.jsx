import React from 'react';
import { withRouter } from 'react-router-dom';
import { shuffle } from "lodash";

class Res extends React.Component {
    constructor(props) {
        super(props);
        this.resIds = props.resIds;
        this.idx = 0;
        
    }

    componentDidMount() {
            this.props.fetchSingleRes(this.props.resIds[this.idx]);
    }

    goNext(e) {
        e.preventDefault();
        if (this.idx === this.resIds.length - 1) {
            this.idx = 0;
            this.resIds = shuffle(this.props.resIds)
        } else {
            this.idx += 1;
        }
        
        this.props.fetchSingleRes(this.resIds[this.idx])
    }

    render() {
        if (!this.props.currentRes) {
            return null;
        };
        return (
            <div className='res-wrapper'>
                <button onClick={this.goNext.bind(this)}>Next</button>

                <div className='res-box' >
                    <div className='pic-box' >
                        <img className='img' src={this.props.currentRes.image_url} />
                    </div>
                    <div className='content-wrapper' ></div>
                </div>
            </div>
        )
    }
 
}

export default withRouter(Res);