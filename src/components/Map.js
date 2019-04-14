import React, { Component } from 'react';



class Map extends Component {
  state = {
    markers: []
  }

  componentDidMount() {
    console.log(this)
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.053018, lng: -118.267254 },
      zoom: 15
    },
    this.createMarker(this.lat, this.lng)
    );
    window.map = map
  }

  loadScript = () => {
    let script = this.createScript();
    let body = document.getElementById('body');
    body.appendChild(script);
    window.initMap = this.initMap;
  }

  createScript = () => {
    let script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbCcwSMuj4y-ECpL-lfHUhPvwzSoFhf24&libraries=geometry,drawing,places&callback=initMap";
    script.async = true;
    script.defer = true;
    return script;
  }

  createMarker = (lat, long) => {
    let marker = new window.google.maps.Marker({
        position: {lat: this.lat, lng: this.long},
        map: this.map
      });
      return marker
  }

  render() {
    const sites = this.props.spas
    this.loadScript(sites);
    return(
      <div id='map'></div>
    )
  }
}

export default Map;
