import React, { Component } from 'react';
import cookie from 'react-cookies'

import TorchMap from '../components/TorchMap'
import Dashboard from '../components/Dashboard'
import AddGame from '../components/AddGame'

import '../App.css';

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      terminalIcons: true,
      wazeIcons: true
    }
  }
  
  logout(){
    cookie.remove('user')
    window.location = '/login'
  }
  
  
  wazeIcons(){
    if(this.state.wazeIcons === false){
      this.setState({
        wazeIcons: true
      })
    } else{
      this.setState({
        wazeIcons: false
      })
    }
  }
  
  terminalIcons(){
    if(this.state.terminalIcons === false){
      this.setState({
        terminalIcons: true
      })
    } else{
      this.setState({
        terminalIcons: false
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <AddGame />
        <div id='cssmenu'>
            <ul>
              <li><a><span>TORCH</span></a></li>
              {(this.state.wazeIcons === true)
              ? <li><a onClick={()=> this.wazeIcons()}><span>Clear Komsel</span></a></li>
              : <li><a onClick={()=> this.wazeIcons()}><span>Show Komsel</span></a></li>
              }
              {(this.state.terminalIcons === true)
              ? <li><a onClick={()=> this.terminalIcons()}><span>Clear Activity</span></a></li>
              : <li><a onClick={()=> this.terminalIcons()}><span>Show Activity</span></a></li>
              }
              <li className="pull-right">
                <a onClick={()=> this.logout()}><span>Logout</span></a>
              </li>
            </ul>
          </div>
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
