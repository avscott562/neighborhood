import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 34.043018, lng: -118.267254 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 34.043018, lng: -118.267254 }} />}
  </GoogleMap>
))


class Map extends Component {
  render() {
    return(
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDbCcwSMuj4y-ECpL-lfHUhPvwzSoFhf24"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map;
