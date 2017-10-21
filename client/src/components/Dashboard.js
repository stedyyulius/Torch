import React, { Component } from 'react';
import AddGame from '../components/AddGame'
import { connect } from 'react-redux'

import { gameList, getOneData } from '../actions/index'

import '../styles/Dashboard.css'

class Dashboard extends Component {
  
  componentDidMount(){
    this.props.gameList()
  }
  
  render(){
    return(
      <div className="list-group">
        <AddGame />

        <p data-toggle="modal" data-target="#AddGame" className="create list-group-item">
          Create Activity
          <img className="pull-right" src="https://i.imgur.com/9WhmPjF.png" />
        </p>
        <p className="online list-group-item">
          Online Game
        </p>
        {(this.props.games)
          ? (this.props.games.map((g,i)=>
              <div className="col-md-12 list-group-item" key={i}>
                <div className="col-md-4">
                <img className="game-icon" src={g.image} alt="game-icon"/>
                </div>
                <div className="col-md-8">
                <p className="game-name">{g.name}</p>
                <p className="game-descr">{g.descr}</p>
                </div>
              </div>
            ))
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  console.log(state.games);
  return{
    games: state.games
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    gameList: () => dispatch(gameList()),
    getOneData: (data) => dispatch(getOneData(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)