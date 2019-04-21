import React, { Component } from 'react';
import DebounceInput from 'react-debounce-input'
import Location from './Location.js'

class Sidebar extends Component {

  render() {
    const selectedSites = this.props.spas
    return (
      <div id="sidebar">
        <h2>Local Spas</h2>
        <DebounceInput debounceTimeout={500}
          type="text"
          value={this.props.query}
          placeholder="Search Spas Here"
          onChange={(e) => this.props.updateQuery(e.target.value)}
        />
        <ol className="locationList">
          {selectedSites.map((site, key) => <Location site={site} key={site.venue.id} marker={this.props.markers} link={this.props.link} />)}
        </ol>
      </div>
    )
  }
}

export default Sidebar
