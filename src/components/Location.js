import React, { Component } from 'react';

class Location extends Component {
  render() {
    const { venue } = this.props.site
    return(
      <li className="site">
        <h4 className="name" onClick={(e) => this.props.link(venue, e.target.value)}>{venue.name}</h4>
        <div className="address">{venue.location.formattedAddress[0]}</div>
        <div className="city">{venue.location.formattedAddress[1]}</div>
      </li>
    )
  }

}

export default Location
