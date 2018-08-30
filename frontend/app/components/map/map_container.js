import { connect } from 'react-redux';
import Map from './map';

const mapStateToProps = state => ({
    coord: state.entities.currentRes.coordinates,
    // lng: state.entities.currentRes.coordinates.longitude
})

export default connect(mapStateToProps)(Map);