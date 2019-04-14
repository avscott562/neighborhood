import React, { Component } from 'react';
import Sidebar from './components/Sidebar.js'
import Map from './components/Map.js'
import * as SpasAPI from './SpasAPI.js'
import './App.css';

class App extends Component {
  state = {
    allSpas: []
  }

  componentDidMount() {
    SpasAPI.getAll().then((spas) => {
      this.setState({ allSpas: spas })
    })
    .catch(err => {
      this.setState({ allSpas: [] })
    })
  }


  render() {
    return (
      <main className="content">
        <h1 className="header">Neighborhood Map</h1>
        <Sidebar spas={this.state.allSpas}/>
        <Map spas={this.state.allSpas}/>
      </main>
    );
  }
}


export default App;
