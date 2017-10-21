import React, { Component } from 'react';
// import '../styles/Dashboard.css'

class Dashboard extends Component {
  render(){
    return(
      <div className="list-group">
        <p href="#" className="list-group-item active">
          ROOM GAME
        </p>
        <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
        <a href="#" className="list-group-item">Morbi leo risus</a>
        <a href="#" className="list-group-item">Porta ac consectetur ac</a>
        <a href="#" className="list-group-item">Vestibulum at eros</a>
      </div>
    )
  }
}

export default Dashboard