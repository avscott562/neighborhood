import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js'
import Map from './components/Map.js'
import * as SpasAPI from './SpasAPI.js'
import './App.css';

class App extends Component {
  state = {
    allSpas: [],
    allMarkers: []
  }

  componentDidMount() {
    SpasAPI.getAll().then(spas => {
      this.setState({ allSpas: spas }, this.loadScript())
    })
    .catch(err => {
      this.setState({ allSpas: [] })
    })
  }

  initMap = () => {
    let markers = []
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0511, lng: -118.4155 },
      zoom: 12
    })
    window.map = map

    let infowindow = new window.google.maps.InfoWindow()
    window.infowindow = this.infowindow

    this.state.allSpas.map(spa => {
      let contentString = spa.venue.name

      let marker = new window.google.maps.Marker({
        position: {lat: spa.venue.location.lat, lng: spa.venue.location.lng},
        map: map,
        id: spa.venue.id,
        isVisible: true
      })

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker)
      })

      markers.push(marker) })
      console.log("markers", markers)

      return this.setState({ allMarkers: markers })
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

  linkMarker = (loc) => {
    console.log("loc", loc)
    const markFinder = this.state.allMarkers.find(mf => mf.id === loc.id)
    if (markFinder) {
      console.log("maf", markFinder)
      // window.infowindow.setContent(loc.name)
      // window.infowindow.open(window.map, markFinder)
    }
  }


  render() {
    return (
      <main className="content">
        <h1 className="header">Neighborhood Map</h1>
        <Sidebar spas={this.state.allSpas} markers={this.state.allMarkers} link={this.linkMarker}/>
        <div id="map"></div>
      </main>
    );
  }
}


export default App;
