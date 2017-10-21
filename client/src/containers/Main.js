import React, { Component } from 'react';

import TorchMap from '../components/TorchMap'
import Dashboard from '../components/Dashboard'

import '../App.css';

class Main extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-9">
            <TorchMap />
          </div>
          <div className="col-md-3">
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
