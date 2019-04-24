import React, { Component } from 'react';

class Location extends Component {
  render() {
    //establish variable for venue prop
    const { venue } = this.props.site
    return(
      //create list item for each location
      <li className="site">
        <p aria-label="spa name"
        tabIndex="0"
        onClick={(e) => this.props.link(venue, e.target.value)}>{venue.name}
        </p>

      </li>
    )
  }

}

export default Location
