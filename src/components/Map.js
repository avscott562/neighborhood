import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 34.053018, lng: -118.267254 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 34.045291, lng: -118.266712 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 34.04769, lng: -118.250558 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 34.042017, lng: -118.258748 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 34.056052, lng: -118.268867 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 34.060692, lng: -118.282764 }} />}
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
