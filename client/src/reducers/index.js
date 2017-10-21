import { combineReducers } from 'redux';

import isCheck from './isCheck'
import rooms from './rooms'
import games from './games'
import isActive from './isActivity'
import isKomsel from './isKomsel'

export default combineReducers({
  isCheck: isCheck,
  rooms: rooms,
  games: games,
  isActive: isActive,
  isKomsel: isKomsel
})