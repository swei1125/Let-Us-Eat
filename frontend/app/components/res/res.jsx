import React from 'react';

class Res extends React.Component {
    constructor(props) {
        super(props);
        this.idx = 0;
    }

    componentDidMount() {
        this.props.fetchSingleRes(this.props.resIds[this.idx])
    }

    render() {
        if (!this.props.currentRes) {
            return null;
        };
        return (
            <div className='res-wrapper'>
                <h1>Res Show</h1>
            </div>
        )
    }
 
}

export default Res;