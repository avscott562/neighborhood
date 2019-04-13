import React, { Component } from 'react';
import Map from './components/Map.js'
import './App.css';

class App extends Component {


  render() {
    return (
      <main>
        <div id="map">
          <Map/>
        </div>
      </main>
    );
  }
}


export default App;
