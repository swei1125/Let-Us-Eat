import React from 'react';
import { mapKey } from '../../../../config/keys';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Map extends React.Component {

    render() {
        const lat = this.props.lat;
        const lng = this.props.lng;
        const MapComponent = withScriptjs(withGoogleMap((props) => (
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: lat, lng: lng }}
            >
                {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
            </GoogleMap>
        )))
        const url = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&v=3.exp&libraries=geometry,drawing,places`;
        return (
            <MapComponent
                isMarkerShown
                googleMapURL={url}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}

export default Map;