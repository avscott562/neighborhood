import React, { Component } from 'react';

class Location extends Component {
  render() {
    const { venue } = this.props.site
    return(
      <li className="site">
        <div className="name">{venue.name}</div>
        <div className="address">{venue.location.formattedAddress[0]}</div>
        <div className="city">{venue.location.formattedAddress[1]}</div>
      </li>
    )
  }

}

export default Location
