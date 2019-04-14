import React, { Component } from 'react';
import Location from './Location.js'

class Sidebar extends Component {
  render() {
    const selectedSites = this.props.spas
    return (
      <div id="sidebar">
        <h2>Local Spas</h2>
        <input type="text"/>
        <ol className="locationList">
          {selectedSites.map((site, key) => <Location site={site} key={site.venue.id} />)}
        </ol>
      </div>
    )
  }
}

export default Sidebar
