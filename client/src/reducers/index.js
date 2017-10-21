import { combineReducers } from 'redux';

import isCheck from './isCheck'
import rooms from './rooms'
import games from './games'

export default combineReducers({
  isCheck: isCheck,
  rooms: rooms,
  games: games
})