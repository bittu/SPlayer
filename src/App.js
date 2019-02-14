import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

import './App.css';
import PlayerContainer from './player/PlayerContainer';
import Home from './Home';


export const items = [
  {
    "type": "PROGRAM",
    "guid": "BBJ1733181A",
    "displayTitle": "Venom",
    "offerTypes": [
      "TVOD",
      "EST"
    ],
    "genres": [
      "Sci-Fi"
    ],
    "packshot": "content_providers/images/7236321_f5676325dc5958f8_SHRP.jpg",
    "anchors": {

    }
  },
  {
    "type": "PROGRAM",
    "guid": "BBJ1728905A",
    "displayTitle": "First Man",
    "offerTypes": [
      "EST"
    ],
    "genres": [
      "Drama"
    ],
    "packshot": "content_providers/images/7182152_c101f6639e6488e3_SHRP.jpg",
    "anchors": {

    }
  },
  {
    "type": "PROGRAM",
    "guid": "BBJ1727836A",
    "displayTitle": "Johnny English Strikes Again",
    "offerTypes": [
      "EST"
    ],
    "genres": [
      "Comedy"
    ],
    "packshot": "content_providers/images/6813515_3e4d5d3dd8b7ff62_SHRP.jpg",
    "anchors": {

    }
  }
];

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route path="/player" component={PlayerContainer}/>
        </div>
      </Router>
    );
  }
}

export default App;
