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
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0511, lng: -118.4165 },
      zoom: 12
    })

    let infowindow = new window.google.maps.InfoWindow()

    this.state.allSpas.map(spa => {
      let contentString = spa.venue.name

      let marker = new window.google.maps.Marker({
        position: {lat: spa.venue.location.lat, lng: spa.venue.location.lng},
        map: map
      })

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker)
      })

      return this.state.allMarkers.push(marker) })
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


  render() {
    return (
      <main className="content">
        <h1 className="header">Neighborhood Map</h1>
        <Sidebar spas={this.state.allSpas}/>
        <div id="map"></div>
      </main>
    );
  }
}


export default App;
