import React from 'react';
import { shuffle } from "lodash";

class Res extends React.Component {
    constructor(props) {
        super(props);
        this.resIds = props.resIds;
        this.idx = 0;
    }

    componentDidMount() {
        this.props.fetchSingleRes(this.props.resIds[this.idx])
    }

    goNext(e) {
        e.preventDefault();
        if (this.idx === this.resIds.length - 1) {
            this.idx = 0;
            this.resIds = shuffle(this.props.resIds)
        } else {
            this.idx += 1;
        }
        console.log(this.resIds);
        
        this.props.fetchSingleRes(this.resIds[this.idx])
    }

    render() {
        if (!this.props.currentRes) {
            return null;
        };
        return (
            <div className='res-wrapper'>
                <h1>Res Show</h1>
                <button onClick={this.goNext.bind(this)}>Next</button>
                <div className='res-box' >
                    <div className='pix-box' ></div>
                    <div className='content-wrapper' ></div>
                </div>
            </div>
        )
    }
 
}

export default Res;