import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js'
import Map from './components/Map.js'
import * as SpasAPI from './SpasAPI.js'
import './App.css';

class App extends Component {
  state = {
    allSpas: [],
    allMarkers: [],
    query: "",
    searchedSpas: []
  }

  componentDidMount() {
    SpasAPI.getAll().then(spas => {
      this.setState({ allSpas: spas, searchedSpas: spas }, this.loadScript())
    })
    .catch(err => {
      this.setState({ allSpas: [], searchedSpas: [] })
    })
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0511, lng: -118.4155 },
      zoom: 12
    })
    window.map = map
    this.createMarker()
  }

  createMarker = () => {
    let markers = []
    let infowindow = new window.google.maps.InfoWindow()
    window.infowindow = infowindow

    this.state.searchedSpas.map(spa => {
      let contentString = spa.venue.name

      let marker = new window.google.maps.Marker({
        position: {lat: spa.venue.location.lat, lng: spa.venue.location.lng},
        map: window.map,
        id: spa.venue.id,
        name: spa.venue.name,
        isVisible: true,
      })

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(window.map, marker)
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        window.setTimeout(function() {
          marker.setAnimation(null)
        }, 1000)
      })

      markers.push(marker) })

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
    this.hideInfowindows()
    const markFinder = this.state.allMarkers.find(mf => mf.id === loc.id)
    if (markFinder) {
      console.log(markFinder)
      markFinder.setAnimation(window.google.maps.Animation.BOUNCE)
      window.infowindow.setContent(loc.name)
      window.infowindow.open(window.map, markFinder)
      window.setTimeout(function() {
        markFinder.setAnimation(null)
      }, 1500)
    }
  }

  hideInfowindows = (map) => {
    this.state.allMarkers.forEach(function(marker) {
      window.infowindow.close()
      marker.setAnimation(null)
    })
  }

  updateQuery = (query) => {
    this.hideInfowindows()
    this.showMarkers()
    this.setState({ searchedSpas: this.state.allSpas, query: query.trim() })
    if(query) {
      this.setState({ searchedSpas: this.searchSpas(query, this.state.searchedSpas) })
      this.hideMarkers(query, this.state.allMarkers)
    } else {
      this.setState({ searchedSpas: this.state.allSpas })
    }
  }

  searchSpas = (query, spas) => {
    return spas.filter(spa => spa.venue.name.toLowerCase().includes(query.toLowerCase()))
  }

  hideMarkers = (query, markers) => {
    return markers.filter(mark => {
      if(!mark.name.toLowerCase().includes(query.toLowerCase())) {
        mark.setMap(null)
      }
    })
  }

  showMarkers = (map) => {
    this.state.allMarkers.forEach(function(marker) {
      marker.setMap(window.map)
    })
  }


  render() {
    return (
      <main className="content">
        <h1 className="header">Neighborhood Map</h1>
        <Sidebar
          spas={this.state.searchedSpas}
          markers={this.state.allMarkers}
          link={this.linkMarker}
          query={this.state.query}
          search={this.updateQuery}
        />
        <div id="map"></div>
      </main>
    );
  }
}


export default App;
