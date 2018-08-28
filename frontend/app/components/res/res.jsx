import React from 'react';

class Res extends React.Component {
    constructor(props) {
        super(props);
        this.idx = 0;
    }

    componentDidMount() {
        this.props.fetchSingleRes(this.props.resIds[idx])
    }

    render() {
        if (!this.props.currentRes) {
            return null;
        };
        return (
            <div className='res-wrapper'>
                
            </div>
        )
    }
 
}

export default Res;