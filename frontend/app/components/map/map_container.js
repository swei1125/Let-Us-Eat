import { connect } from 'react-redux';
import Map from './map';

const mapStateToProps = state => ({
    lat: state.entities.currentRes.coordinates.latitude,
    lng: state.entities.currentRes.coordinates.longitude
})

export default connect(mapStateToProps)(Map);