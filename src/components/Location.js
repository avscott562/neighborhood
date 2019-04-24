import React, { Component } from 'react';

class Location extends Component {
  render() {
    const { venue } = this.props.site
    return(
      <li className="site">
        <h4 className="name" tabindex="0" onClick={(e) => this.props.link(venue, e.target.value)}>{venue.name}</h4>        
      </li>
    )
  }

}

export default Location
