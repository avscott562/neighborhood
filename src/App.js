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
    searchedSpas: [],
    venueDetails: []
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
    let content

    this.state.searchedSpas.map(spa => {
      console.log(spa)
      let contentString = `<div id="infoWindow"><p>${spa.venue.name}</p>
      <p>${spa.venue.location.address}</p>
      <p>${spa.venue.location.city}</p>
      <p>${spa.venue.location.crossStreet}</p></div>`

      let marker = new window.google.maps.Marker({
        position: {lat: spa.venue.location.lat, lng: spa.venue.location.lng},
        map: window.map,
        id: spa.venue.id,
        name: spa.venue.name,
        visible: true
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
      let contentString = `<div id="infoWindow"><p>${loc.name}</p>
      <p>${loc.location.address}</p>
      <p>${loc.location.city}</p>
      <p>${loc.location.crossStreet}</p></div>`
      markFinder.setAnimation(window.google.maps.Animation.BOUNCE)
      window.infowindow.setContent(contentString)
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
        mark.visible=false
      }
    })
  }

  showMarkers = (map) => {
    this.state.allMarkers.forEach(function(marker) {
      marker.visible=true
    })
  }

  getVenueDetails = () => {
    let details=[]
    this.state.searchedSpas.forEach(function(site) {
      let detail
      SpasAPI.getDetails(site.id)
      .then(res => detail)
      .then(detail => details.push(detail))
    })
    return this.setState({ venueDetails: details })
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
