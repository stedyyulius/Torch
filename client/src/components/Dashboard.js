import React, { Component } from 'react';
import AddGame from '../components/AddGame'

import '../styles/Dashboard.css'

class Dashboard extends Component {
  render(){
    return(
      <div className="list-group">
        <AddGame />
        <p data-toggle="modal" data-target="#AddGame" className="create list-group-item">
          Create Activity
          <img className="pull-right" src="https://i.imgur.com/9WhmPjF.png" />
        </p>
        <p className=" online list-group-item">Online Games</p>
        <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
        <a href="#" className="list-group-item">Morbi leo risus</a>
        <a href="#" className="list-group-item">Porta ac consectetur ac</a>
        <a href="#" className="list-group-item">Vestibulum at eros</a>
      </div>
    )
  }
}

export default Dashboard