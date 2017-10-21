import React, { Component } from 'react';
import cookie from 'react-cookies'
import brand from '../logotorch.png'
import { connect } from 'react-redux'

import TorchMap from '../components/TorchMap'
import Dashboard from '../components/Dashboard'

import '../App.css';

import { isActivity, isKomsel } from '../actions/index'

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      terminalIcons: true,
      wazeIcons: true
    }
  }
  
  componentWillMount(){
    if(!cookie.load('user')){
      window.location = '/login'
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
      this.props.isKomsel(true)
    } else{
      this.setState({
        wazeIcons: false
      })
      this.props.isKomsel(false)
    }
  }
  
  terminalIcons(){
    if(this.state.terminalIcons === false){
      this.setState({
        terminalIcons: true
      })
      this.props.isActivity(true)
    } else{
      this.setState({
        terminalIcons: false
      })
      this.props.isActivity(false)
    }
  }
  
  render() {
    return (
      <div className="App">
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#"><img src="https://i.imgur.com/HUIETSB.png" alt="TORCH" /></a>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                {(this.state.wazeIcons === true)
                  ? <li><a onClick={()=> this.wazeIcons()}><span className="navtext">Clear Komsel</span></a></li>
                  : <li><a onClick={()=> this.wazeIcons()}><span className="navtext">Show Komsel</span></a></li>
                  }
                  {(this.state.terminalIcons === true)
                  ? <li><a onClick={()=> this.terminalIcons()}><span className="navtext">Clear Activity</span></a></li>
                  : <li><a onClick={()=> this.terminalIcons()}><span className="navtext">Show Activity</span></a></li>
                  }
                  <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown"><span className="navtext">Achievement</span></a>
                    <ul className="dropdown-menu">
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> New Member<span className="w3-margin-left w3-badge w3-red"> 1</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Score Game Player (Monthly)<span className="w3-margin-left w3-badge w3-red"> 2</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> 1st Activity at Cellgroup<span className="w3-margin-left w3-badge w3-red"> 3</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Member in Cellgroup (Monthly)<span className="w3-margin-left w3-badge w3-red"> 3</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Join Event<span className="w3-margin-left w3-badge w3-red"> 3</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Activity with Other Cellgroup<span className="w3-margin-left w3-badge w3-red"> 4</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Member in Cellgroup (Annual)<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Highest Score Game Player (Annual)<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Multiply Cellgroup<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> Stability Cellgroup<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                      <li><a><img src="https://i.imgur.com/j7QZ4c0.png" alt="TORCH" className="w3-margin-right img-rounded" alt="Cinque Terre" /> New Member Each Month<span className="w3-margin-left w3-badge w3-red"> 5</span></a></li>
                    </ul>
                  </li>
                </ul>
                <ul className="nav navbar-nav pull-right">
                  <li><img src={cookie.load('user').picture.data.url} className="img-circle" alt="Cinque Terre" /></li>
                  <li><a><span className="navtext">{cookie.load('user').name}</span></a></li>                  
                  <li><a onClick={()=> this.logout()}><span className="navtext">Logout</span></a></li>
                </ul>
              </div>
            </div>
          </nav>
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

const mapStateToProps = (state) =>{
  return{
    
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    isActivity: (status) => dispatch(isActivity(status)),
    isKomsel: (status) => dispatch(isKomsel(status))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
