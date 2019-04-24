import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input'
import Location from './Location.js'

class Sidebar extends Component {

  render() {
    //create var for spas prop
    const selectedSites = this.props.spas
    return (
      <div id="sidebar">
        <h2 aria-label="sidebar header">Local Spas</h2>
        <DebounceInput debounceTimeout={500}
          type="text"
          className="inputField"
          value={this.props.query}
          placeholder="Search Spas Here"
          onChange={(e) => this.props.search(e.target.value)}
        />
        <ol className="locationList" aria-label="spa list">
          {selectedSites.map((site, key) => <Location site={site} key={site.venue.id} marker={this.props.markers} link={this.props.link} />)}
        </ol>
      </div>
    )
  }
}

export default Sidebar
