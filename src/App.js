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
  }


  render() {
    return (
      <main className="content">
        <Sidebar spas={this.state.allSpas}/>
        <Map spas={this.state.allSpas}/>
      </main>
    );
  }
}


export default App;
