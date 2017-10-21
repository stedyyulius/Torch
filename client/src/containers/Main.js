import React, { Component } from 'react';
import cookie from 'react-cookies'
import brand from '../logotorch.png'
import { connect } from 'react-redux'

import TorchMap from '../components/TorchMap'
import Dashboard from '../components/Dashboard'
import AddGame from '../components/AddGame'

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
        <AddGame />
        <div>
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a class="navbar-brand" href="#"><img src="https://i.imgur.com/HUIETSB.png" alt="TORCH" /></a>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                {(this.state.wazeIcons === true)
                  ? <li><a onClick={()=> this.wazeIcons()}><span>Clear Komsel</span></a></li>
                  : <li><a onClick={()=> this.wazeIcons()}><span>Show Komsel</span></a></li>
                  }
                  {(this.state.terminalIcons === true)
                  ? <li><a onClick={()=> this.terminalIcons()}><span>Clear Activity</span></a></li>
                  : <li><a onClick={()=> this.terminalIcons()}><span>Show Activity</span></a></li>
                  }
                </ul>
                <ul className="nav navbar-nav pull-right">
                  <li><img src={cookie.load('user').picture.data.url} className="img-circle" alt="Cinque Terre" /></li>
                  <li><a><span>{cookie.load('user').name}</span></a></li>                  
                  <li><a onClick={()=> this.logout()}><span>Logout</span></a></li>
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
