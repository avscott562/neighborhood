import React, { Component } from 'react';

class Location extends Component {
  componentDidMount() {
    console.log(this)
  }

  render() {
    const { venue } = this.props.site
    return(
      <li className="site">
        <div className="name">{venue.name}</div>
      </li>
    )
  }

}

export default Location
