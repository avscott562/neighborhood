import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js'
import * as SpasAPI from './SpasAPI.js'
import './App.css';


class App extends Component {
  //create state and establish variables
  state = {
    allSpas: [],
    allMarkers: [],
    query: "",
    searchedSpas: [],
    venueDetails: []
  }

  componentDidMount() {
    //get all site data
    SpasAPI.getAll().then(spas => {
      this.setState({ allSpas: spas, searchedSpas: spas }, this.loadScript())
    })
    .catch(err => {
      this.setState({ allSpas: [], searchedSpas: [] })
    })
  }

  //create map
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.0911, lng: -118.4155 },
      zoom: 12.1
    })
    window.map = map
    //create marker
    this.createMarker()
  }

  //create markers function
  createMarker = () => {
    let markers = []
    let infowindow = new window.google.maps.InfoWindow()
    window.infowindow = infowindow

    this.state.searchedSpas.map(spa => {
      //content for infowindow
      let contentString = `<div id="infoWindow"><p>${spa.venue.name}</p>
      <p>${spa.venue.location.address}</p>
      <p>${spa.venue.location.city}</p>
      <p>${spa.venue.location.crossStreet}</p></div>`

      //create marker
      let marker = new window.google.maps.Marker({
        position: {lat: spa.venue.location.lat, lng: spa.venue.location.lng},
        map: window.map,
        id: spa.venue.id,
        name: spa.venue.name,
        visible: true
      })

      //add listener to marker, create infowindow, and set animation
      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(window.map, marker)
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        //remove animation from marker
        window.setTimeout(function() {
          marker.setAnimation(null)
        }, 1000)
      })

      //add marker to array
      markers.push(marker) })

      //add all markers to state markers variable
      return this.setState({ allMarkers: markers })
  }

  //load script to page
  loadScript = () => {
    let script = this.createScript();
    let body = document.getElementById('body');
    body.appendChild(script);
    window.initMap = this.initMap;
  }

  //create script to get google map
  createScript = () => {
    let script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbCcwSMuj4y-ECpL-lfHUhPvwzSoFhf24&libraries=geometry,drawing,places&callback=initMap";
    script.async = true;
    script.defer = true;
    return script;
  }

  //connect the item in the list to it's associated marker
  linkMarker = (loc) => {
    //close all infowindows
    this.hideInfowindows()
    //find marker associated with site
    const markFinder = this.state.allMarkers.find(mf => mf.id === loc.id)
    if (markFinder) {
      //create data for infowindow
      let contentString = `<div id="infoWindow"><p>${loc.name}</p>
      <p>${loc.location.address}</p>
      <p>${loc.location.city}</p>
      <p>${loc.location.crossStreet}</p></div>`
      //add animation to marker and display infowindow
      markFinder.setAnimation(window.google.maps.Animation.BOUNCE)
      window.infowindow.setContent(contentString)
      window.infowindow.open(window.map, markFinder)
      //remove animation from marker
      window.setTimeout(function() {
        markFinder.setAnimation(null)
      }, 1500)
    }
  }

  //close all infowindows function
  hideInfowindows = (map) => {
    this.state.allMarkers.forEach(function(marker) {
      window.infowindow.close()
      marker.setAnimation(null)
    })
  }

  //evaluate query from text box
  updateQuery = (query) => {
    //close all infowindows
    this.hideInfowindows()
    //show markers for searched sites
    this.showMarkers()
    this.setState({ searchedSpas: this.state.allSpas, query: query.trim() })
    if(query) {
      this.setState({ searchedSpas: this.searchSpas(query, this.state.searchedSpas) })
      this.hideMarkers(query, this.state.allMarkers)
    } else {
      this.setState({ searchedSpas: this.state.allSpas })
    }
  }

  //search spas against query function
  searchSpas = (query, spas) => {
    return spas.filter(spa => spa.venue.name.toLowerCase().includes(query.toLowerCase()))
  }

  //close markers not searched
  hideMarkers = (query, markers) => {
    return markers.filter(mark => {
      if(!mark.name.toLowerCase().includes(query.toLowerCase())) {
        mark.visible=false
      }
    })
  }

  //open markers not searched
  showMarkers = (map) => {
    this.state.allMarkers.forEach(function(marker) {
      marker.visible=true
    })
  }

  // getVenueDetails = () => {
  //   let details=[]
  //   this.state.searchedSpas.forEach(function(site) {
  //     let detail
  //     SpasAPI.getDetails(site.id)
  //     .then(res => detail)
  //     .then(detail => details.push(detail))
  //   })
  //   return this.setState({ venueDetails: details })
  // }


  render() {
    return (
      <main className="content">
        <h1 className="header" tabIndex="0" >Neighborhood Map</h1>
        <Sidebar
          aria-label="sidebar"
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
